import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarComponent} from '../calendar/calendar.component';
import {NavbarComponent} from '../home/navbar/navbar.component';
interface Reservation {
  id: number;
  user_id: number;
  date: string;
  time: string;
  end_time: string;
  status: string;
  user_name: string;
  user_email: string;
}


@Component({
  selector: 'app-reservation',
  standalone: true,
  templateUrl: './reservation.component.html',
  imports: [
    FormsModule,
    CommonModule,
    FullCalendarModule,
    CalendarComponent,
    NavbarComponent,
  ],
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  date = '';
  time = '';
  endTime = '';
  minEndTime = '';
  reservations: Reservation[] = [];
  message = '';

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  // Met à jour automatiquement l'heure de fin (ajoute 2h)
  updateEndTime(): void {
    if (this.time) {
      const startDateTime = new Date();
      const [hours, minutes] = this.time.split(':').map(Number);
      startDateTime.setHours(hours + 1, minutes, 0);

      this.minEndTime = startDateTime.toTimeString().substring(0, 5);
      this.endTime = this.minEndTime;
    }
  }


  onReserve(): void {
    const user_id = this.getUserId();

    if (!this.date || !this.time || !this.endTime) {
      this.message = "Veuillez remplir tous les champs.";
      return;
    }

    this.reservationService.addReservation(user_id, this.date, this.time, this.endTime).subscribe({
      next: (response) => {
        this.message = response.message;
        this.loadReservations();
      },
      error: () => {
        this.message = 'Erreur lors de la réservation.';
      }
    });
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data.map(res => ({
          ...res,
          endTime: res.end_time ,
          user_email: res.user_email
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations:', err);
      }
    });
  }


  getUserId(): number | null {
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.error('Utilisateur non connecté ou données manquantes dans localStorage');
      return null;
    }

    try {
      const user = JSON.parse(userData);
      return user.id || null;
    } catch (error) {
      console.error('Erreur lors du parsing des données utilisateur', error);
      return null;
    }
  }
}
