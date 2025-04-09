import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = environment.apiUrlReservation;

  constructor(private http: HttpClient) {}

  addReservation(user_id: number | null, date: string, time: string, end_time: string): Observable<any> {
    if (!user_id) {
      console.error("Erreur : user_id est null !");
      return new Observable(observer => {
        observer.error("Données utilisateur manquantes !");
        observer.complete();
      });
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, { user_id, date, time, end_time }, { headers });
  }


  getReservations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  approveReservation(requestData: { action: string, reservation_id: number }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, requestData, { headers });
  }

  cancelReservation(requestData: { action: string, reservation_id: number }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, requestData, { headers });
  }
}
