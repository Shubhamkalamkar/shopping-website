import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h1 class="page-title">My Profile</h1>
      <div class="profile-card">
        <div class="profile-header">
          <i class="fas fa-user-circle profile-icon"></i>
          <h2>John Doe</h2>
          <p>john.doe&#64;example.com</p>
        </div>
        <div class="profile-details">
          <div class="detail-group">
            <h3>Personal Information</h3>
            <p><strong>Phone:</strong> +1 234 567 890</p>
            <p><strong>Address:</strong> 123 Main St, City, Country</p>
          </div>
          <div class="detail-group">
            <h3>Account Settings</h3>
            <button class="edit-btn">Edit Profile</button>
            <button class="edit-btn">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .page-title {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
    }
    .profile-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .profile-header {
      background: linear-gradient(45deg, #3498db, #2980b9);
      color: white;
      padding: 2rem;
      text-align: center;
    }
    .profile-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    .profile-header h2 {
      margin: 0;
      font-size: 1.5rem;
    }
    .profile-header p {
      margin: 0.5rem 0 0;
      opacity: 0.9;
    }
    .profile-details {
      padding: 2rem;
    }
    .detail-group {
      margin-bottom: 2rem;
    }
    .detail-group h3 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }
    .detail-group p {
      margin: 0.5rem 0;
      color: #666;
    }
    .edit-btn {
      background: #3498db;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 1rem;
      margin-top: 1rem;
      &:hover {
        background: #2980b9;
      }
    }
  `]
})
export class ProfileComponent {}
