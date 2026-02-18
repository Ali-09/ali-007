import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

type InputVariant = 'primary' | 'secondary' | 'error';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() variant: InputVariant = 'primary';
  @Input() disabled: boolean = false;
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;
  @Input() hint: string = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() focused = new EventEmitter<FocusEvent>();
  @Output() blurred = new EventEmitter<FocusEvent>();

  value: string = '';
  touched = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl | null) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(value: string): void {
    if (this.disabled) {
      return;
    }

    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  handleFocus(event: FocusEvent): void {
    if (this.disabled) {
      return;
    }

    this.focused.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.markTouched();
    this.blurred.emit(event);
  }

  get hasError(): boolean {
    if (!this.ngControl || !this.ngControl.control) {
      return false;
    }

    const control = this.ngControl.control;
    return !!control.invalid && (!!control.touched || !!control.dirty);
  }

  get errorMessage(): string | null {
    if (!this.hasError || !this.ngControl || !this.ngControl.errors) {
      return null;
    }

    const errors = this.ngControl.errors;

    if (errors['required']) {
      return 'Este campo es requerido.';
    }

    if (errors['email']) {
      return 'Ingresa un correo electrónico válido.';
    }

    if (errors['minlength']) {
      return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres.`;
    }

    if (errors['min']) {
      return `El valor mínimo es ${errors['min'].min}.`;
    }

    return 'Valor inválido.';
  }

  get containerVariantClass(): string {
    if (this.hasError) {
      return 'border-red-500/70 focus-within:ring-2 focus-within:ring-red-400/70 focus-within:border-red-400';
    }

    switch (this.variant) {
      case 'secondary':
        return 'border-white/10 focus-within:ring-2 focus-within:ring-blue-400/70 focus-within:border-blue-400';
      case 'error':
        return 'border-red-500/70 focus-within:ring-2 focus-within:ring-red-400/70 focus-within:border-red-400';
      case 'primary':
      default:
        return 'border-white/10 focus-within:ring-2 focus-within:ring-emerald-400/70 focus-within:border-emerald-400';
    }
  }

  private markTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
