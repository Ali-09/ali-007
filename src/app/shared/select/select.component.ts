import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption<T = unknown> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T = unknown> implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() options: SelectOption<T>[] = [];
  @Input() disabled: boolean = false;
  @Input() hint: string = '';

  @Output() valueChange = new EventEmitter<T | null>();

  value: T | null = null;
  touched = false;
  open = false;

  onChange: (value: T | null) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private host: ElementRef<HTMLElement>) {}

  writeValue(value: T | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get displayLabel(): string {
    if (this.value == null) {
      return this.placeholder || 'Selecciona una opción';
    }

    const option = this.options.find(o => o.value === this.value);
    return option?.label ?? String(this.value);
  }

  toggleOpen(): void {
    if (this.disabled) return;
    this.open = !this.open;
  }

  handleChange(raw: unknown): void {
    const option = this.options.find(o => String(o.value) === String(raw)) || null;
    const newValue = option ? option.value : null;
    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
    this.markTouched();
    this.open = false;
  }

  handleBlur(): void {
    this.markTouched();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.open) return;

    const target = event.target as Node | null;
    if (target && !this.host.nativeElement.contains(target)) {
      this.open = false;
      this.markTouched();
    }
  }

  private markTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
