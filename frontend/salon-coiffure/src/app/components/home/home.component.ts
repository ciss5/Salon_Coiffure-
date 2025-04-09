import { Component } from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {MainComponent} from './main/main.component';
import {InfoComponent} from '../info/info.component';
import {MarquesComponent} from '../marques/marques.component';
import {FooterComponent} from '../footer/footer.component';
import {CalendarComponent} from '../calendar/calendar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    MainComponent,
    InfoComponent,
    MarquesComponent,
    FooterComponent,
    CalendarComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
