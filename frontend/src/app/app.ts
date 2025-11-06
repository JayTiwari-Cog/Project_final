import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthProvider } from './services/auth.provider';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('smart-hotel-booking');
  userRole: 'user' | 'manager' | null = null;
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService, private authProvider: AuthProvider) {}

  ngOnInit() {
    // Check initial login state
    this.checkLoginStatus();
    
    // Listen for route changes to update login state
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus() {
    // Check if token exists in AuthProvider (in-memory)
    const token = this.authProvider.getToken();
    const storedRole = localStorage.getItem('userRole');

    // User is logged in if token exists in memory
    this.isLoggedIn = !!token;

    if (this.isLoggedIn) {
      this.userRole = (storedRole === 'manager' ? 'manager' : 'user') as 'user' | 'manager';
    } else {
      this.userRole = null;
    }

    console.log('Login status checked:', { isLoggedIn: this.isLoggedIn, userRole: this.userRole, hasTokenInMemory: !!token });
  }

  // Navigation methods
  showHome() {
    // If user is logged in, show logout confirmation
    if (this.isLoggedIn) {
      if (confirm('Do you want to logout and return to home?')) {
        this.logout();
      }
    } else {
      // If not logged in, navigate to home normally
      this.router.navigate(['/home']);
    }
  }

  showGuestLogin() {
    this.router.navigate(['/guest-login']);
  }

  showManagerLogin() {
    this.router.navigate(['/manager-login']);
  }

  showRegister() {
    this.router.navigate(['/register']);
  }

  showHotelSearch() {
    this.router.navigate(['/user/hotel-search']);
  }

  showFeedback() {
    this.router.navigate(['/user/feedback']);
  }

  showMyBookings() {
    this.router.navigate(['/user/my-bookings']);
  }

  showDashboard() {
    if (this.userRole === 'manager') {
      this.router.navigate(['/manager/dashboard']);
    } else {
      this.router.navigate(['/user/hotel-search']);
    }
  }

  logout() {
    // Clear token from memory and remove role
    this.authProvider.clearToken();
    localStorage.removeItem('userRole');
    this.authService.logout();
    this.userRole = null;
    this.isLoggedIn = false;
    this.showHome();
  }
}
