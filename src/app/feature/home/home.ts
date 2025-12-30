import { Component, signal } from '@angular/core';
import { Buttons } from '../../shared/components/ui/buttons/buttons';

@Component({
  selector: 'app-home',
  imports: [Buttons, ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  isLoading = signal<boolean>(false);

  // Input state
  email = '';
  password = '';
  emailTouched = false;

  get emailError() {
    if (!this.email) return 'Email is required';
    if (!this.email.includes('@')) return 'Invalid email';
    return '';
  }

  get passwordError() {
    if (!this.password) return 'Password is required';
    if (this.password.length < 6) return 'Password must be at least 6 characters';
    return '';
  }

  submit() {
    this.isLoading.set(true);
  }
}
