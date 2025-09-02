import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { ToastService } from './core/services/toast.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition }) => {
          const html = document.documentElement;
          html.classList.add('page-transition-active');
          
          transition.finished.finally(() => {
            html.classList.remove('page-transition-active');
          });
        }
      })
    ),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    ToastService,
  ],
};
