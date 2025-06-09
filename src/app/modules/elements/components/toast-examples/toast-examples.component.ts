import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastPosition } from '../../../../core/models/toast.model';
import { ToastService } from '../../../auth/services/toast.service';

@Component({
  selector: 'app-toast-examples',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-examples.component.html',
})
export class ToastExamplesComponent {
  constructor(private toastService: ToastService) {}

  showSuccess(): void {
    this.toastService.success('Operation completed successfully!');
  }

  showError(): void {
    this.toastService.error('An error occurred while processing your request.');
  }

  showWarning(): void {
    this.toastService.warning('Please review your information before proceeding.');
  }

  showInfo(): void {
    this.toastService.info('New features are available! Check them out.');
  }

  showTopLeft(): void {
    this.toastService.show({
      message: 'This toast appears in the top-left corner',
      type: 'info',
      position: ToastPosition.TopLeft,
      duration: 3000,
    });
  }

  showTopRight(): void {
    this.toastService.show({
      message: 'This toast appears in the top-right corner',
      type: 'success',
      position: ToastPosition.TopRight,
      duration: 3000,
    });
  }

  showBottomLeft(): void {
    this.toastService.show({
      message: 'This toast appears in the bottom-left corner',
      type: 'warning',
      position: ToastPosition.BottomLeft,
      duration: 3000,
    });
  }

  showBottomRight(): void {
    this.toastService.show({
      message: 'This toast appears in the bottom-right corner',
      type: 'error',
      position: ToastPosition.BottomRight,
      duration: 3000,
    });
  }

  showShortDuration(): void {
    this.toastService.show({
      message: 'This toast will disappear in 2 seconds',
      type: 'info',
      position: ToastPosition.TopRight,
      duration: 2000,
    });
  }

  showLongDuration(): void {
    this.toastService.show({
      message: 'This toast will disappear in 5 seconds',
      type: 'info',
      position: ToastPosition.TopRight,
      duration: 5000,
    });
  }

  showPermanent(): void {
    this.toastService.show({
      message: 'This toast will stay until you close it',
      type: 'info',
      position: ToastPosition.TopRight,
      duration: 0,
    });
  }

  showCustomMessage(): void {
    this.toastService.show({
      message: '✨ This is a custom toast message with emojis! 🎉',
      type: 'success',
      position: ToastPosition.TopRight,
      duration: 3000,
    });
  }

  showLongMessage(): void {
    this.toastService.show({
      message:
        'This is a very long message that demonstrates how the toast component handles lengthy content. It should wrap properly and maintain its layout.',
      type: 'warning',
      position: ToastPosition.TopRight,
      duration: 3000,
    });
  }
}
