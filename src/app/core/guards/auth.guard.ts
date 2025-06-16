import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const AuthGuard = (): boolean | UrlTree => {
  const { isAuthenticated } = inject(AuthService);
  const router = inject(Router);

  if (isAuthenticated) {
    return true;
  }

  return router.parseUrl('/login');
};
