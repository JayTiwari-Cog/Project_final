import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
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

  constructor(private router: Router, private authService: AuthService) {}

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
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      // For now, treat all logged-in users as regular users
      // You can extend this logic later to differentiate between user and manager
      this.userRole = 'user';
    } else {
      this.userRole = null;
    }
  }

  // Navigation methods
  showHome() {
    this.router.navigate(['/home']);
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
    this.authService.logout();
    this.userRole = null;
    this.isLoggedIn = false;
    this.showHome();
  }
}
