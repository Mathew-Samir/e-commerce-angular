import { Component, OnInit, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/ui/input/input';
import { Buttons } from '../../../../shared/components/ui/buttons/buttons';
import { Auth } from '../../../../core/services/auth/auth';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../../core/validators/custom-validators';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, InputComponent, Buttons],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  registrForm: FormGroup;
  private authService = inject(Auth);
  private router = inject(Router);
  isLoading = signal<boolean>(false);
  errorMessage = '';

  constructor() {
    this.registrForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        CustomValidators.nameValidator
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        CustomValidators.passwordValidator
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        CustomValidators.phoneValidator
      ]),
    }, { validators: CustomValidators.passwordMatch('password', 'rePassword') });
  }

  ngOnInit(): void {
    // Optional: Listen to form value changes
    this.registrForm.valueChanges.subscribe(values => {
      console.log('Form values:', values);
    });
  }

  onSubmit(): void {
    if (this.registrForm.valid) {
      // Mark all controls as touched to trigger validation display
      this.markFormGroupTouched(this.registrForm);

      // Submit form data
      this.isLoading.set(true);
      this.authService.sendRegisterToAPI(this.registrForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          console.log('Registration success:', res);
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage = err.error.message || 'Registration failed';
          console.error('Registration error:', err);
        }
      });
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
