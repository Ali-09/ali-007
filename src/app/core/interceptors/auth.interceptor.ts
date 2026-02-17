import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const _authService = inject(AuthService);

  // Clone the request and add the authorization header if token exists
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  // Handle the request and check for 401 status
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Clear user data and navigate to login
        _authService.clearAuthState();
        // Usar un pequeño retraso para asegurar que la navegación se complete
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
      return throwError(() => error);
    })
  );
};
