import {Component, HostListener} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  // Ferme le menu si on clique en dehors
  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    const menu = document.querySelector('.navbar');
    const burger = document.querySelector('.burger-menu');

    if (this.menuOpen && menu && burger && !menu.contains(event.target as Node) && !burger.contains(event.target as Node)) {
      this.menuOpen = false;
    }
  }
}
