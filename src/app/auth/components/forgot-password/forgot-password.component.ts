import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div class="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Enter your email address to reset your password.</p>
      <form (ngSubmit)="onSubmit()" #forgotPasswordForm="ngForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" [(ngModel)]="email" required>
        </div>
        <button type="submit" [disabled]="!forgotPasswordForm.valid">
          Reset Password
        </button>
      </form>
      <div class="links">
        <a routerLink="/auth/login">Back to Login</a>
      </div>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 {
      text-align: center;
      margin-bottom: 1rem;
    }
    p {
      text-align: center;
      margin-bottom: 2rem;
      color: #666;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.8rem;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }
    button:disabled {
      background-color: #ccc;
    }
    .links {
      margin-top: 1rem;
      text-align: center;
    }
    a {
      color: #3498db;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class ForgotPasswordComponent {
  email = '';

  constructor(private authService: AuthService) {}

  async onSubmit() {
    if (this.email) {
      try {
        await this.authService.forgotPassword(this.email);
      } catch (error) {
        console.error('Password reset request failed:', error);
      }
    }
  }
}
