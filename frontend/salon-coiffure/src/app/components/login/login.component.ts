import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.status === "success" && response.user) {
          this.authService.storeUserData(response.user, response.token);

          this.message = 'Connexion réussie !';

          // Vérifier si l'utilisateur est admin et rediriger
          if (response.user.role === 'admin') {
            this.router.navigate(['/admin-dashboard']); //dans admin-dashboard
          } else {
            this.router.navigate(['/home']); // dans home
          }
        } else {
          this.message = 'Email ou mot de passe incorrect.';
        }
      },
      error: () => {
        this.message = 'Erreur de connexion.';
      }
    });
  }



}
