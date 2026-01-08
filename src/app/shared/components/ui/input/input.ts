import { Component, EventEmitter, Input, Output, Optional, Self, DoCheck } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
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

  // Password toggle
  @Input() showPasswordToggle = true;

  // For Reactive Forms
  @Input() formControlName?: string;

  // Styling
  @Input() inputClass = "block w-[100%] rounded-sm border border-gray-300 bg-white p-1.5 m-1.5 ml-0 focus:border-green-500 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 outline-none focus:outline-none";
  @Input() labelClass = "block mb-1 text-sm font-medium text-gray-600";
  @Input() errorClass = "mt-1 text-sm text-red-600";
  @Input() wrapperClass = "";
  @Input() toggleButtonClass = "absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-gray-700";

  // Events
  @Output() blur = new EventEmitter<void>();

  // Internal state
  value = '';
  touched = false;
  error = '';
  @Input() success = '';
  showPassword = false;

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
    const val: string = (this.ngControl.control.value ?? '') as string;

    // Priority: required first
    if (errors['required']) {
      return 'This field is required. Please provide a value.';
    }

    // Email
    if (errors['email']) {
      return 'Please enter a valid email address (e.g. user@example.com).';
    }

    // Custom name validators from Signup
    if (errors['invalidName']) {
      return 'Name may contain only letters and spaces (no numbers or special characters). Example: "Ahmed Ali".';
    }
    if (errors['nameMixedCase']) {
      return 'Name should include both uppercase and lowercase letters (e.g. "Ahmed Ali") to match formatting rules.';
    }

    // Password-specific (more detailed: detect which part is missing)
    if (errors['weakPassword']) {
      const missing: string[] = [];
      const wp = errors['weakPassword'];

      // If wp is a boolean true (old style), we still need the generic message
      // If wp is an object with flags, we use them
      if (typeof wp === 'object') {
        if (!wp.hasUpperCase) missing.push('an uppercase letter (A-Z)');
        if (!wp.hasLowerCase) missing.push('a lowercase letter (a-z)');
        if (!wp.hasNumber) missing.push('a number (0-9)');
        if (!wp.hasSymbol) missing.push('a symbol (e.g. !@#$%)');
      } else {
        // Fallback for simple boolean error
        if (!/[A-Z]/.test(val)) missing.push('an uppercase letter (A-Z)');
        if (!/[a-z]/.test(val)) missing.push('a lowercase letter (a-z)');
        if (!/[0-9]/.test(val)) missing.push('a number (0-9)');
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)) missing.push('a symbol (e.g. !@#$%)');
      }

      if (missing.length === 0) {
        return 'Password must include uppercase, lowercase, numbers, and symbols.';
      }
      const last = missing.pop();
      const list = missing.length ? `${missing.join(', ')} and ${last}` : `${last}`;
      return `Password must include ${list}. Example: P@ssw0rd1`;
    }

    // Password mismatch (typically set on rePassword control)
    if (errors['passwordMismatch']) {
      return 'Passwords do not match. Make sure both password fields are identical.';
    }

    // Minlength (Angular provides requiredLength)
    if (errors['minlength']) {
      const req = errors['minlength'].requiredLength;
      return `Minimum length is ${req} characters. Please enter at least ${req} characters.`;
    }

    // Pattern (try to show the requiredPattern if available)
    if (errors['pattern']) {
      const rp = errors['pattern'].requiredPattern;
      if (rp) {
        return `Invalid format. Expected pattern: ${rp}`;
      }
      return 'Invalid format. Please follow the required pattern.';
    }

    // Phone custom error from Signup
    if (errors['invalidPhone']) {
      return 'Phone number must be exactly 11 digits (only numbers). Example: 01234567890';
    }

    // Fallback
    return 'Invalid value. Please check the input and try again.';
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    if (this.type === 'password' && this.showPasswordToggle) {
      this.showPassword = !this.showPassword;
    }
  }

  // Get current input type (accounts for password toggle)
  get currentInputType(): string {
    if (this.type === 'password' && this.showPasswordToggle && this.showPassword) {
      return 'text';
    }
    return this.type;
  }

  // Get eye icon based on visibility state
  get eyeIcon(): string {
    return this.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash';
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

  // Check if password toggle should be shown
  get shouldShowPasswordToggle(): boolean {
    return this.type === 'password' && this.showPasswordToggle;
  }
}
