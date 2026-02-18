import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'error' | 'warning';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() fullWidth: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  get variantClass(): string {
    switch (this.variant) {
      case 'secondary':
        return 'btn-secondary';
      case 'error':
        return 'btn-error';
      case 'warning':
        return 'btn-warning';
      case 'primary':
      default:
        return 'btn-primary';
    }
  }

  get sizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'text-sm px-3 py-1.5';
      case 'lg':
        return 'text-lg px-6 py-3';
      case 'md':
      default:
        return '';
    }
  }

  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }

    this.clicked.emit(event);
  }
}

