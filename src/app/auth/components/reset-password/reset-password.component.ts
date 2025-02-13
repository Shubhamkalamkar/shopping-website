import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  template: `
    <div class="reset-password-container">
      <h2>Reset Password</h2>
      <form (ngSubmit)="onSubmit()" #resetPasswordForm="ngForm">
        <div class="form-group">
          <label for="password">New Password</label>
          <input type="password" id="password" name="password" [(ngModel)]="password" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" [(ngModel)]="confirmPassword" required>
        </div>
        <button type="submit" [disabled]="!resetPasswordForm.valid || password !== confirmPassword">
          Reset Password
        </button>
      </form>
      <div class="links">
        <a routerLink="/auth/login">Back to Login</a>
      </div>
    </div>
  `,
  styles: [`
    .reset-password-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 {
      text-align: center;
      margin-bottom: 2rem;
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
export class ResetPasswordComponent {
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService) {}

  async onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    if (this.password) {
      try {
        await this.authService.resetPassword(this.password);
      } catch (error) {
        console.error('Password reset failed:', error);
      }
    }
  }
}
