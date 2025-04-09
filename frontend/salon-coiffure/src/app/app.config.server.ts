import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes),
    provideHttpClient(),
    provideClientHydration(),
    {
      provide: 'DOCUMENT',
      useValue: {
        createElement: () => ({
          setAttribute: () => {},
          querySelector: () => null,
          querySelectorAll: () => [],
          style: {},
          appendChild: () => {},
          classList: {
            add: () => {},
            remove: () => {}
          }
        }),
        body: {
          appendChild: () => {},
          insertBefore: () => {},
          querySelector: () => null,
          querySelectorAll: () => []
        },
        querySelector: () => null,
        querySelectorAll: () => []
      }
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
