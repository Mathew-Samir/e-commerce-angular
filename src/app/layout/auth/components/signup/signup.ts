import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/ui/input/input';
import { Buttons } from '../../../../shared/components/ui/buttons/buttons';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,InputComponent,Buttons],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  registrForm : FormGroup = new FormGroup({
    name : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
    rePassword : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
  })

  // Input state
  email = '';
  name = '';
  password = '';
  rePassword = '';
  phone = '';
  emailTouched = false;

  // Error getters for each field
get nameError() {
  if (!this.name) return 'Name is required';
  if (this.name.length < 3) return 'Name must be at least 3 characters';
  return '';
}

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

get rePasswordError() {
  if (!this.rePassword) return 'Please confirm your password';
  if (this.rePassword !== this.password) return 'Passwords do not match';
  return '';
}

get phoneError() {
  if (!this.phone) return 'Phone is required';
  if (this.phone.length < 10) return 'Invalid phone number';
  return '';
}
}

