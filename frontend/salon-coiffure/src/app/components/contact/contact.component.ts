import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NavbarComponent} from '../home/navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  imports: [
    FormsModule,
    NavbarComponent,
    FooterComponent,
    RouterLink
  ],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = {
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  };
  constructor(private http: HttpClient) {}

  envoyer() {
    //a changer en prod http://localhost/Mon-salon-coiffure/backend/sendMail.php par :
    this.http.post('http://localhost/Mon-salon-coiffure/backend/sendMail.php', this.contact).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          alert('✅ Message envoyé avec succès !');
          this.contact = {nom: '', email: '', telephone: '', sujet: '', message: ''};
        } else {
          alert('❌ Une erreur est survenue : ' + res.message);
        }
      },
      error: () => {
        alert('❌ Impossible de contacter le serveur.');
      }
    });
  }
}
