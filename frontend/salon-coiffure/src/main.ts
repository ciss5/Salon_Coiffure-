import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import {routes} from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import {provideCookieConsent} from './app/cookie.providers';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideCookieConsent() ,//  le module des cookies
    //appRouting
  ]
}).catch(err => console.error(err));
