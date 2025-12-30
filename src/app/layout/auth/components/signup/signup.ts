import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/ui/input/input';
import { Buttons } from '../../../../shared/components/ui/buttons/buttons';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, InputComponent, Buttons],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  registrForm: FormGroup;

  constructor() {
    this.registrForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        this.nameValidator.bind(this)
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator.bind(this)
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        this.phoneValidator.bind(this)
      ]),
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Optional: Listen to form value changes
    this.registrForm.valueChanges.subscribe(values => {
      console.log('Form values:', values);
    });
  }

  // Validator: Name must contain both uppercase and lowercase letters
  private nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const onlyLetters = /^[a-zA-Z\s]+$/.test(value);

    if (!onlyLetters) {
      return { invalidName: true };
    }
    if (!hasUpperCase || !hasLowerCase) {
      return { nameMixedCase: true };
    }
    return null;
  }

  // Validator: Password must contain uppercase, lowercase, numbers, and symbols
  private passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSymbol) {
      return { weakPassword: true };
    }
    return null;
  }

  // Validator: Phone must be exactly 11 digits
  private phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const isValid = /^[0-9]{11}$/.test(value);
    if (!isValid) {
      return { invalidPhone: true };
    }
    return null;
  }

  // Custom validator to check if passwords match
  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      rePassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registrForm.valid) {
      // Mark all controls as touched to trigger validation display
      this.markFormGroupTouched(this.registrForm);

      // Submit form data
      console.log('Form submitted:', this.registrForm.value);
      // Add your form submission logic here
    } else {
      // Mark all controls as touched to show validation errors
      this.markFormGroupTouched(this.registrForm);
    }
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Convenience getters for template access
  get name() { return this.registrForm.get('name'); }
  get email() { return this.registrForm.get('email'); }
  get password() { return this.registrForm.get('password'); }
  get rePassword() { return this.registrForm.get('rePassword'); }
  get phone() { return this.registrForm.get('phone'); }
}
