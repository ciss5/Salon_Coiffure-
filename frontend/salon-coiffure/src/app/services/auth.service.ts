import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrlUsers;
  private isBrowser: boolean;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  register(name: string, email: string, password: string): Observable<any> {
    const body = { action: 'register', name, email, password };
    return this.http.post(this.apiUrl, body);
  }

  login(email: string, password: string): Observable<any> {
    const body = { action: 'login', email, password };
    return new Observable(observer => {
      this.http.post(this.apiUrl, body).subscribe({
        next: (response: any) => {
          if (response.status === "success" && response.user) {
            this.storeUserData(response.user, response.token); //  Stocker les données
          }
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  storeUserData(user: any, token?: string): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      console.warn("Tentative de stockage d'un utilisateur invalide :", user);
    }

    if (token) {
      localStorage.setItem('auth_token', token);
    }
  }
  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'admin';
  }
  logout() { // a faire aprs une bouton  Déconnexion qui utilise la méthode logout().
    localStorage.removeItem('user');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
