import {Component, EventEmitter,Input,Output,Optional,Self,DoCheck} from '@angular/core';
import {ControlValueAccessor,NgControl,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputComponent implements ControlValueAccessor, DoCheck {
  // Basic
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;

  // UI
  @Input() label = '';
  @Input() icon?: string;
  @Input() required = false;

  // For Reactive Forms
  @Input() formControlName?: string;

  // Styling
  @Input() inputClass = "block w-[100%] rounded-sm border border-gray-300 bg-white p-1.5 m-1.5 ml-0 focus:border-green-500 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200";
  @Input() labelClass = "block mb-1 text-sm font-medium text-gray-600";
  @Input() errorClass = "mt-1 text-sm text-red-600";
  @Input() wrapperClass = "";

  // Events
  @Output() blur = new EventEmitter<void>();

  // Internal state
  value = '';
  touched = false;
  error = '';
  @Input() success = '';

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngDoCheck(): void {
    if (this.ngControl?.control) {
      // Update error state
      if (this.ngControl.control.errors && this.ngControl.control.touched) {
        this.error = this.getErrorMessage();
        this.touched = true;
      } else {
        this.error = '';
        this.touched = this.ngControl.control.touched || false;
      }
    }
  }

  private getErrorMessage(): string {
    if (!this.ngControl?.control?.errors) return '';

    const errors = this.ngControl.control.errors;

    if (errors['required']) {
      return 'This field is required';
    } else if (errors['email']) {
      return 'Please enter a valid email';
    } else if (errors['minlength']) {
      return `Minimum length is ${errors['minlength'].requiredLength} characters`;
    } else if (errors['pattern']) {
      return 'Invalid format';
    }

    return 'Invalid value';
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
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

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
    this.blur.emit();
  }

  // Helper to check if control has error
  get hasError(): boolean {
    return !!(this.error && this.touched);
  }
}
