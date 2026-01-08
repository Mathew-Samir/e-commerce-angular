import { Component, OnInit, inject, signal } from '@angular/core';
import { Buttons } from '../../../../shared/components/ui/buttons/buttons';
import { InputComponent } from '../../../../shared/components/ui/input/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth/auth';
import { Router } from '@angular/router';
import { AuthResponse } from '../../../../core/interface/auth.interface';
import { CustomValidators } from '../../../../core/validators/custom-validators';

@Component({
  selector: 'app-login',
  imports: [Buttons, InputComponent, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm: FormGroup;
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  private readonly authService = inject(Auth );
  private readonly router = inject(Router);

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        CustomValidators.passwordValidator
      ]),
    });
  }

  ngOnInit(): void {
    // Listen to form value changes
    this.loginForm.valueChanges.subscribe(values => {
      console.log('Form values:', values);
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Mark all controls as touched to trigger validation display
      this.markFormGroupTouched(this.loginForm);

      // Submit form data
      this.isLoading.set(true);
      this.authService.sendLoginToAPI(this.loginForm.value).subscribe({
        next: (res: AuthResponse) => {
          this.isLoading.set(false);
          console.log('Login success:', res);
          // navigate to home or dashboard after login
          this.router.navigate(['/dashboard/home']);
        },
        error: (err: { error: { message: string; }; }) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error.message || 'Login failed');
          console.error('Login error:', err);
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Convenience getters for template access
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
