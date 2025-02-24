import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    setTimeout(() => {
      this.showLoginPopup();
    }, 5000);
  }

  showLoginPopup() {
    Swal.fire({
      title: '<button type="button" class="close-btn" onclick="Swal.close()">&times;</button><div class="login-popup-header"><h1 class="company-name animate-text">AHARON BETH</h1><h2 class="welcome-text">Welcome Back!</h2></div>',
      html: `
        <div class="login-form">
          <div class="form-group animate-up">
            <input type="email" id="email" class="swal2-input" placeholder="Email">
          </div>
          <div class="form-group animate-up">
            <input type="password" id="password" class="swal2-input" placeholder="Password">
          </div>
          <div class="form-actions animate-up">
            <a href="#" class="forgot-link">Forgot Password?</a>
            <label class="remember-label">
              <input type="checkbox" id="remember">
              <span>Remember me</span>
            </label>
          </div>
        </div>
      `,
      showCancelButton: false,
      confirmButtonText: 'Login',
      customClass: {
        popup: 'login-popup animate-popup',
        confirmButton: 'login-btn animate-up'
      },
      showCloseButton: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      backdrop: `
        rgba(0,0,0,0.4)
        url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z' fill='none' stroke='%23F5E5CE' stroke-width='0.5'%3E%3C/path%3E%3Cpath d='M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Z' fill='none' stroke='%23F5E5CE' stroke-width='0.5'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 12 12' to='360 12 12' dur='1s' repeatCount='indefinite'/%3E%3C/path%3E%3C/svg%3E")
        center center
        no-repeat
      `,
      preConfirm: () => {
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        if (!email || !password) {
          Swal.showValidationMessage('Please enter both email and password');
          return false;
        }
        return { email, password };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle login logic here
        console.log('Login attempt with:', result.value);
      }
    });
  }
}
