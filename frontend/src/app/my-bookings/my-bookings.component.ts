import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface BookingRecord {
  id: string;
  hotelName: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
  price: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="header-section mb-4">
        <button class="btn btn-outline-primary mb-3" (click)="goBack()">
          <i class="bi bi-arrow-left"></i> Back
        </button>
        <h1 class="text-primary">My Bookings</h1>
        <p class="text-muted">View and manage your hotel reservations</p>
      </div>

      <div *ngIf="!isLoggedIn" class="alert alert-warning">
        <i class="bi bi-exclamation-triangle"></i>
        Please log in to view your bookings.
        <button class="btn btn-primary ms-2" (click)="goToLogin()">Login</button>
      </div>

      <div *ngIf="isLoggedIn && bookings.length === 0" class="text-center py-5">
        <i class="bi bi-calendar-x text-muted" style="font-size: 4rem;"></i>
        <h3 class="text-muted mt-3">No bookings found</h3>
        <p class="text-muted">You haven't made any hotel bookings yet.</p>
        <button class="btn btn-primary" (click)="searchHotels()">
          <i class="bi bi-search"></i> Search Hotels
        </button>
      </div>

      <div *ngIf="isLoggedIn && bookings.length > 0" class="row">
        <div class="col-md-6 mb-4" *ngFor="let booking of bookings">
          <div class="card h-100 shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">{{ booking.hotelName }}</h5>
              <span class="badge" [ngClass]="{
                'bg-success': booking.status === 'confirmed',
                'bg-warning': booking.status === 'pending',
                'bg-danger': booking.status === 'cancelled'
              }">
                {{ booking.status | titlecase }}
              </span>
            </div>
            <div class="card-body">
              <p class="card-text">
                <i class="bi bi-geo-alt text-primary"></i>
                <strong>Location:</strong> {{ booking.location }}
              </p>
              <p class="card-text">
                <i class="bi bi-calendar-event text-success"></i>
                <strong>Check-in:</strong> {{ booking.checkInDate | date }}
              </p>
              <p class="card-text">
                <i class="bi bi-calendar-x text-danger"></i>
                <strong>Check-out:</strong> {{ booking.checkOutDate | date }}
              </p>
              <p class="card-text">
                <i class="bi bi-currency-rupee text-info"></i>
                <strong>Price:</strong> ₹{{ booking.price }}
              </p>
              <p class="card-text">
                <small class="text-muted">
                  <i class="bi bi-clock"></i>
                  Booked on: {{ booking.bookingDate | date }}
                </small>
              </p>
            </div>
            <div class="card-footer bg-transparent">
              <button class="btn btn-outline-success btn-sm me-2" (click)="openFeedback(booking)">
                <i class="bi bi-chat-left-text"></i> Feedback
              </button>
              <button *ngIf="booking.status === 'confirmed'" class="btn btn-outline-danger btn-sm" (click)="cancelBooking(booking)">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
    }
    .badge {
      font-size: 0.75em;
    }
  `]
})
export class MyBookingsComponent implements OnInit {
  bookings: BookingRecord[] = [];
  isLoggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.loadBookings();
    }
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  loadBookings() {
    // For now, load some mock data
    // In a real application, this would fetch from a service
    this.bookings = [
      {
        id: '1',
        hotelName: 'Grand Palace Hotel',
        location: 'Mumbai',
        checkInDate: '2025-11-01',
        checkOutDate: '2025-11-03',
        price: 5000,
        bookingDate: '2025-10-20',
        status: 'confirmed'
      },
      {
        id: '2',
        hotelName: 'Ocean View Resort',
        location: 'Goa',
        checkInDate: '2025-12-15',
        checkOutDate: '2025-12-18',
        price: 8000,
        bookingDate: '2025-10-19',
        status: 'pending'
      }
    ];
  }

  goBack() {
    this.router.navigate(['/user/hotel-search']);
  }

  goToLogin() {
    this.router.navigate(['/guest-login']);
  }

  searchHotels() {
    this.router.navigate(['/user/hotel-search']);
  }

  openFeedback(booking: BookingRecord) {
    // Navigate to feedback form and pass booking information
    this.router.navigate(['/user/feedback'], {
      state: {
        bookingId: booking.id,
        hotelName: booking.hotelName,
        location: booking.location
      }
    });
  }

  cancelBooking(booking: BookingRecord) {
    if (confirm(`Are you sure you want to cancel your booking at ${booking.hotelName}?`)) {
      booking.status = 'cancelled';
      alert('Booking cancelled successfully.');
    }
  }
}