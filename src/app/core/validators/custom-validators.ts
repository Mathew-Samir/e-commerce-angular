import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static nameValidator(control: AbstractControl): ValidationErrors | null {
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

  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSymbol) {
      return {
        weakPassword: {
          hasUpperCase,
          hasLowerCase,
          hasNumber,
          hasSymbol
        }
      };
    }
    return null;
  }

  static phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const isValid = /^[0-9]{11}$/.test(value);
    if (!isValid) {
      return { invalidPhone: true };
    }
    return null;
  }

  static passwordMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      // If there are other errors on the matching control, don't override them if they are not passwordMismatch
      const errors = matchingControl.errors;
      if (errors && !errors['passwordMismatch']) {
        // We still want to check for mismatch, but if it was valid before, we might need to add the error
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ ...errors, passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        if (errors && errors['passwordMismatch']) {
          const newErrors = { ...errors };
          delete newErrors['passwordMismatch'];
          matchingControl.setErrors(Object.keys(newErrors).length ? newErrors : null);
        }
        return null;
      }
    };
  }
}
