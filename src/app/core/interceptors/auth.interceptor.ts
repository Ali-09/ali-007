import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ToastPosition } from '../models/toast.model';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const _authService = inject(AuthService);
  const toastService = inject(ToastService);

  // Clone the request and add the authorization header if token exists
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  // Handle the request: global success and error toasts + 401 handling
  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const method = req.method.toUpperCase();

        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
          const body = event.body as { detail?: string; message?: string } | null;
          const explicitMessage: string | undefined = body?.detail ?? body?.message;

          const fallbackByMethod: Record<string, string> = {
            POST: 'Registro creado correctamente.',
            PUT: 'Registro actualizado correctamente.',
            PATCH: 'Cambios guardados correctamente.',
            DELETE: 'Registro eliminado correctamente.',
          };

          const message = explicitMessage ?? fallbackByMethod[method] ?? 'Operación realizada correctamente.';

          toastService.success(message, ToastPosition.BottomRight);
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let message = 'Ocurrió un error inesperado.';

      const apiMessage: string | undefined = error.error?.detail ?? error.error?.message;

      if (apiMessage) {
        message = apiMessage;
      } else if (error.status === 0) {
        message = 'No se pudo conectar con el servidor.';
      } else if (error.status === 400) {
        message = 'La petición no es válida.';
      } else if (error.status === 401) {
        message = 'Tu sesión ha expirado. Inicia sesión nuevamente.';
      } else if (error.status === 403) {
        message = 'No tienes permisos para realizar esta acción.';
      } else if (error.status === 404) {
        message = 'Recurso no encontrado.';
      } else if (error.status >= 500) {
        message = 'Error interno del servidor.';
      }

      toastService.error(message, ToastPosition.BottomRight);

      if (error.status === 401) {
        _authService.clearAuthState();
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }

      return throwError(() => error);
    }),
  );
};
