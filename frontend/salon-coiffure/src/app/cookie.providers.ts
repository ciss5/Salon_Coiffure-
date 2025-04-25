import { importProvidersFrom } from '@angular/core';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' //a  change en  prod par '.ciss-mame.fr'
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
