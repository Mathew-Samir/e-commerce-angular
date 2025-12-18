import { Component, signal } from '@angular/core';
import { Buttons } from '../../shared/components/ui/buttons/buttons';
import { InputComponent } from '../../shared/components/ui/input/input';

@Component({
  selector: 'app-home',
  imports: [Buttons, InputComponent],
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

  // get passwordError() {
  //   if (!this.email) return 'Password is required';
  //   if (!this.email.includes('@')) return 'Invalid email';
  //   return '';
  // }

  submit() {
    this.isLoading.set(true);
  }
}
