import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  imports: [FullCalendarModule],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    slotMinTime: '09:00:00',
    slotMaxTime: '19:00:00',
    nowIndicator: true,
    selectable: true,
    editable: false,
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    dateClick: this.handleDateClick.bind(this),
  } as CalendarOptions;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.http.get<any[]>('http://localhost/Mon-salon-coiffure/backend/controllers/reservation.php')
      .subscribe(reservations => {
        let events = [];
        let today = new Date();

        for (let i = 0; i < 7; i++) {
          let currentDate = new Date();
          currentDate.setDate(today.getDate() + i);
          let dateStr = currentDate.toISOString().split('T')[0];

          if (currentDate.getDay() === 1) continue;

          for (let hour = 9; hour < 19; hour++) {
            let timeStr = `${hour.toString().padStart(2, '0')}:00:00`;
            let isReserved = reservations.some(res => res.date === dateStr && res.time === timeStr);

            events.push({
              title: isReserved ? '🔒 Réservé' : '✅ Disponible',
              start: `${dateStr}T${timeStr}`,
              end: `${dateStr}T${hour + 1}:00:00`,
              backgroundColor: isReserved ? '#dc3545' : '#28a745',
              borderColor: isReserved ? '#dc3545' : '#28a745',
              classNames: isReserved ? ['fc-event-reserved'] : ['fc-event-available'],
              display: 'block'
            });
          }
        }

        this.calendarOptions = {
          ...this.calendarOptions,
          events: events
        };
      });
  }

  handleDateClick(arg: any) {
    const selectedDate = new Date(arg.dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Vous ne pouvez pas réserver pour un jour passé !");
      return;
    }

    const selectedTime = prompt("Choisissez une heure entre 09:00 et 19:00 (ex: 14:00) :");

    if (!selectedTime) return;

    const [hour, minute] = selectedTime.split(":").map(Number);
    if (hour < 9 || hour >= 19) {
      alert("Les réservations doivent être entre 09h et 19h !");
      return;
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert("Vous devez être connecté pour réserver !");
      this.router.navigate(['/login']);
      return;
    }

    const reservationData = {
      user_id: userId,
      date: arg.dateStr,
      time: selectedTime
    };

    this.http.post('http://localhost/Mon-salon-coiffure/backend/controllers/reservation.php', reservationData)
      .pipe(
        tap(() => {
          alert("✅ Réservation confirmée !");
          this.loadReservations();
        }),
        catchError(error => {
          alert("❌ Erreur lors de la réservation. Vérifiez que le créneau est disponible.");
          console.error("Erreur de réservation :", error);
          return of(null);
        })
      )
      .subscribe();
  }
}
