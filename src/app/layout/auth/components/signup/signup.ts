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
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Optional: Listen to form value changes
    this.registrForm.valueChanges.subscribe(values => {
      console.log('Form values:', values);
    });
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
    console.log(this.registrForm.value);
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
