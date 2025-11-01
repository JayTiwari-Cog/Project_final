import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../apiService/userService';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private userService:UserService){}
  user = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  };
 
  errorMessage: string = '';
  termsError: string = '';

  
  validatePasswordMatch(): boolean {
    return this.user.password === this.user.confirmPassword;
  }
  submitted = false;
 onSubmit(form: NgForm): void {
  this.errorMessage = '';
  this.termsError = '';
  this.submitted = true;

  if (form.valid && this.validatePasswordMatch()) {
    this.userService.registerUser(this.user).subscribe({
      next: (response) => {
        console.log('User Registered Successfully', response);
        this.errorMessage = 'Registration successful! You can now log in.';
        this.resetForm(form);
      },
      error: (error) => {
        console.error('Error during registration:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  } else {
    form.form.markAllAsTouched();
    this.errorMessage = 'Please fix the errors in the form';
  }
}

private resetForm(form: NgForm): void {
  form.resetForm();
  this.user = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  };
  this.submitted = false;
}

  acceptTerms() {
    this.user.agreeTerms = true;
    this.termsError = '';
  }


}
