import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Toast, ToastPosition } from '@core/models/toast.model';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ 
          opacity: 0, 
          transform: 'translateY(-20px)',
          willChange: 'transform, opacity'
        }),
        animate('280ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ 
            opacity: 1, 
            transform: 'translateY(0)',
            willChange: 'auto'
          })
        )
      ]),
      transition(':leave', [
        style({ 
          opacity: 1, 
          transform: 'translateY(0)',
          willChange: 'transform, opacity'
        }),
        animate('230ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ 
            opacity: 0, 
            transform: 'translateY(-20px)',
            willChange: 'auto'
          })
        )
      ])
    ])
  ]
})
export class ToastComponent {
  private readonly toastService = inject(ToastService);
  protected readonly toasts = this.toastService.getToasts();
  protected readonly positions: ToastPosition[] = [
    ToastPosition.TopRight,
    ToastPosition.TopLeft,
    ToastPosition.BottomRight,
    ToastPosition.BottomLeft
  ];

  private readonly toastStyles: Record<Toast['type'], string> = {
    success: 'from-teal-500/60 to-teal-600/60 text-teal-50',
    error: 'from-rose-500/60 to-rose-600/60 text-rose-50',
    warning: 'from-yellow-500/60 to-yellow-600/60 text-yellow-50',
    info: 'from-sky-500/60 to-sky-600/60 text-sky-50',
  };

  private readonly toastIcons: Record<Toast['type'], string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'i',
  };

  private readonly positionClasses: Record<ToastPosition, string> = {
    [ToastPosition.TopRight]: 'top-4 right-4',
    [ToastPosition.TopLeft]: 'top-4 left-4',
    [ToastPosition.BottomRight]: 'bottom-4 right-4',
    [ToastPosition.BottomLeft]: 'bottom-4 left-4'
  };

  protected getToastsByPosition(position: ToastPosition): Toast[] {
    return this.toasts().filter(toast => toast.position === position);
  }

  protected getToastClasses(toast: Toast): Record<string, boolean> {
    return {
      [this.toastStyles[toast.type]]: true
    };
  }

  protected getPositionClasses(position: ToastPosition): string {
    return this.positionClasses[position];
  }

  protected getIcon(type: Toast['type']): string {
    return this.toastIcons[type];
  }

  protected onClose(toast: Toast): void {
    this.toastService.remove(toast);
  }
}
