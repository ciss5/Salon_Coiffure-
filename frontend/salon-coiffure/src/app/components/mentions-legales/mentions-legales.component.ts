import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../home/navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-mentions-legales',
  standalone:true,
  imports: [
    RouterLink,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './mentions-legales.component.html',
  styleUrl: './mentions-legales.component.css'
})
export class MentionsLegalesComponent {

}
