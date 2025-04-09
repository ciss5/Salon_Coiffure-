import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// Polyfill DOM avant le bootstrap
if (typeof global['document'] === 'undefined') {
  global['document'] = {
    createElement: () => ({
      setAttribute: () => {},
      style: {},
      appendChild: () => {}
    }),
    body: {
      appendChild: () => {},
      insertBefore: () => {}
    }
  } as any;
}

const bootstrap = () => bootstrapApplication(AppComponent, config);
export default bootstrap;
