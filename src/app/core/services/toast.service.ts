import { Injectable, signal, Signal } from '@angular/core';
import { Toast, ToastPosition } from '@core/models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts = signal<Toast[]>([]);

  constructor() {}

  getToasts(): Signal<Toast[]> {
    return this.toasts.asReadonly();
  }

  success(message: string, position: ToastPosition = ToastPosition.TopRight, duration: number = 3000): void {
    this.show({
      message,
      type: 'success',
      position,
      duration,
    });
  }

  error(message: string, position: ToastPosition = ToastPosition.TopRight, duration: number = 3000): void {
    this.show({
      message,
      type: 'error',
      position,
      duration,
    });
  }

  warning(message: string, position: ToastPosition = ToastPosition.TopRight, duration: number = 3000): void {
    this.show({
      message,
      type: 'warning',
      position,
      duration,
    });
  }

  info(message: string, position: ToastPosition = ToastPosition.TopRight, duration: number = 3000): void {
    this.show({
      message,
      type: 'info',
      position,
      duration,
    });
  }

  show(toast: Toast): void {
    const currentToasts = this.toasts();
    const positionToasts = currentToasts.filter(t => t.position === toast.position);

    if (positionToasts.length >= 4) {
      const updatedToasts = currentToasts.filter(t => t.position !== toast.position);
      updatedToasts.push(toast);
    this.toasts.set(updatedToasts);
    } else {
      this.toasts.set([...currentToasts, toast]);
    }

    if (toast.duration) {
      setTimeout(() => {
        this.remove(toast);
      }, toast.duration);
    }
  }

  remove(toast: Toast): void {
    const currentToasts = this.toasts();
    this.toasts.set(currentToasts.filter(t => t !== toast));
  }
}
