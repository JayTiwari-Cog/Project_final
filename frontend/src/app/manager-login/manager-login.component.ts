import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-manager-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent {
  private authService = inject(AuthService);
  private validationService = inject(ValidationService);
  private router = inject(Router);
  
  user = {
    email: '',
    password: ''
  };
  
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';

  validateEmail(): void {
    const validation = this.validationService.validateEmail(this.user.email);
    this.emailError = validation.valid ? '' : validation.error || '';
  }
  
  validatePassword(): void {
    const validation = this.validationService.validatePassword(this.user.password);
    this.passwordError = validation.valid ? '' : validation.error || '';
  }
  
  onSubmit(): void {
    this.errorMessage = '';
    this.emailError = '';
    this.passwordError = '';

    const loginResult = this.authService.processLogin(this.user.email, this.user.password);
    
    if (loginResult.success) {
      this.router.navigate(['/manager/dashboard']);
      
      this.user = {
        email: '',
        password: ''
      };
    } else {
      this.errorMessage = loginResult.message || 'Manager login failed';
      
      const validation = this.validationService.validateLoginForm(this.user.email, this.user.password);
      if (!validation.valid) {
        this.emailError = validation.errors.email || '';
        this.passwordError = validation.errors.password || '';
      }
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  switchToGuestLogin(): void {
    this.router.navigate(['/guest-login']);
  }
}
