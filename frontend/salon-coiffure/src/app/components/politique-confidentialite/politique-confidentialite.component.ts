import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from '../home/navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-politique-confidentialite',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './politique-confidentialite.component.html',
  styleUrls: ['./politique-confidentialite.component.css']
})
export class PolitiqueConfidentialiteComponent {}
