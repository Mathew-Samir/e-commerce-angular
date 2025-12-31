import { Component, OnInit } from '@angular/core';
import { Buttons } from '../../../../shared/components/ui/buttons/buttons';
import { InputComponent } from '../../../../shared/components/ui/input/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [Buttons, InputComponent, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  registrForm: FormGroup;

  constructor() {
    this.registrForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    // Listen to form value changes
    this.registrForm.valueChanges.subscribe(values => {
      console.log('Form values:', values);
    });
  }

  onSubmit(): void {
    if (this.registrForm.valid) {
      console.log('Form submitted:', this.registrForm.value);
      // Add your form submission logic here
    } else {
      this.markFormGroupTouched(this.registrForm);
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
    return this.registrForm.get('email');
  }

  get password() {
    return this.registrForm.get('password');
  }
}
