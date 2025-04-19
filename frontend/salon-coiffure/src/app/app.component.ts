import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationStart } from '@angular/router';
import { NgcCookieConsentModule, NgcCookieConsentService, NgcStatusChangeEvent, NgcCookieConsentConfig } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { NgIf } from '@angular/common';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  },
  palette: {
    popup: { background: '#2e2e2e', text: '#fff' },
    button: { background: '#28a745', text: '#fff' }
  },
  theme: 'classic',
  type: 'opt-in',
  layout: 'basic',
  content: {
    message: 'Ce site utilise des cookies et vous donne le contrôle sur ceux que vous souhaitez activer',
    allow: 'Tout accepter',
    deny: 'Tout refuser',
    link: 'Politique de confidentialité',
    href: '/mentions-legales',
    policy: 'Politique de confidentialité',
    header: '🍪 Cookies & vie privée',
    customize: 'Personnaliser'
  }
};

export function provideCookieConsent() {
  return importProvidersFrom(NgcCookieConsentModule.forRoot(cookieConfig));
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HttpClientModule, NgcCookieConsentModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'salon-coiffure';
  private statusChangeSubscription!: Subscription;
  private routerSubscription!: Subscription;
  cookieConsentGiven = false;
  showCookieOverlay = true;

  constructor(
    private ccService: NgcCookieConsentService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.ccService.hasConsented()) {
      this.cookieConsentGiven = true;
      this.showCookieOverlay = false;
    }
    if (!this.cookieConsentGiven) {
      document.body.classList.add('no-scroll');
    }

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        this.cookieConsentGiven = true;
        this.showCookieOverlay = false;
        document.body.classList.remove('no-scroll');

        if (event.status === 'allow') {
          this.activateAnalytics();
        }

        this.storeConsent(event.status);
      }
    );

    this.routerSubscription = this.router.events.subscribe(event => {
      if (
        event instanceof NavigationStart &&
        !this.cookieConsentGiven &&
        event.url !== '/'
      ) {
        this.ccService.open();
        this.showCookieOverlay = true;
        this.router.navigateByUrl('/');
      }
    });

    setTimeout(() => {
      if (!this.cookieConsentGiven) {
        this.ccService.open();
      }
    }, 500);
  }

  activateAnalytics() {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-P7EJEDSK6K';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'G-P7EJEDSK6K');
  }

  storeConsent(consent: 'allow' | 'deny' | 'dismiss') {
    this.http.post('https://beautyglow.ciss-mame.fr/backend/controllers/saveConsent.php', {
      consent,
      ip: 'auto'
    }).subscribe({
      next: () => console.log('Consentement envoyé au serveur'),
      error: err => console.error('Erreur consentement', err)
    });
  }

  ngOnDestroy(): void {
    this.statusChangeSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }

  openCookieSettings() {
    setTimeout(() => {
      try {
        this.ccService.open();
      } catch (err) {
        console.warn('Popup cookie non prête :', err);
      }
    }, 500);
  }
}
