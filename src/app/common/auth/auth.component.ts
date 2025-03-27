import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AuthComponent {
  isLoginMode = true;
  authForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  showPassword = false;
  showConfirmPassword = false;
  separateDialCode = true;

  passwordValidationMessages = {
    minLength: 'Password must be at least 8 characters',
    uppercase: 'Password must contain at least one uppercase letter',
    lowercase: 'Password must contain at least one lowercase letter',
    number: 'Password must contain at least one number',
    special: 'Password must contain at least one special character'
  };

  passwordValidationStatus = {
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.authForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, this.createPasswordValidator()]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });

    this.authForm.get('password')?.valueChanges.subscribe(value => {
      this.updatePasswordValidationStatus(value);
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  createPasswordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isLengthValid = value.length >= 8;

      const errors: ValidationErrors = {};
      if (!isLengthValid) errors['minLength'] = true;
      if (!hasUpperCase) errors['uppercase'] = true;
      if (!hasLowerCase) errors['lowercase'] = true;
      if (!hasNumber) errors['number'] = true;
      if (!hasSpecial) errors['special'] = true;

      return Object.keys(errors).length ? errors : null;
    };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.pristine || confirmPassword?.pristine) return null;

    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  updatePasswordValidationStatus(value: string) {
    if (!value) {
      Object.keys(this.passwordValidationStatus).forEach(key => {
        this.passwordValidationStatus[key as keyof typeof this.passwordValidationStatus] = false;
      });
      return;
    }

    this.passwordValidationStatus.minLength = value.length >= 8;
    this.passwordValidationStatus.uppercase = /[A-Z]/.test(value);
    this.passwordValidationStatus.lowercase = /[a-z]/.test(value);
    this.passwordValidationStatus.number = /[0-9]/.test(value);
    this.passwordValidationStatus.special = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const formValue = this.authForm.value;
    const email = formValue.email;
    const password = formValue.password;

    this.isLoading = true;
    this.error = null;

    if (this.isLoginMode) {
      this.authService.login(email).subscribe(
        (response: AuthResponse) => {
          this.isLoading = false;
          // Handle successful login
        },
        (errorMessage: string) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    } else {
      const userData = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phoneNumber: formValue.phoneNumber,
        password: formValue.password
      };
      this.authService.register(userData).subscribe(
        (response: AuthResponse) => {
          this.isLoading = false;
          // Handle successful signup
        },
        (errorMessage: string) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.authForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email';
    }

    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${minLength} characters`;
    }

    if (controlName === 'phoneNumber' && control.hasError('validatePhoneNumber')) {
      return 'Please enter a valid phone number';
    }

    if (controlName === 'confirmPassword' && this.authForm.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }

    return '';
  }
}