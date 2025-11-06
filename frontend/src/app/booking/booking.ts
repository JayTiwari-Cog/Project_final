import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingDetails } from '../booking-details/booking-details';
 
// import {GuestSelection} from "../guest-selector/guest-selector.component";
@Component({
  selector: 'app-booking',
  imports: [CommonModule, BookingDetails],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css'],
})
export class Booking implements OnInit {
  @Input() hotel: any;
  @Output() close = new EventEmitter<void>();
  @Output() bookingConfirmed = new EventEmitter<any>();
  
  @Input() checkIn: string = '';
  @Input() checkOut: string = '';
  openBookingDetails: boolean = false;
  
  constructor(private router: Router) {}
 
  ngOnInit() {
    const storedBookingData = sessionStorage.getItem('bookingData');
    if (storedBookingData) {
      const bookingData = JSON.parse(storedBookingData);
      this.hotel = bookingData.hotel;
      this.checkIn = bookingData.checkInDate;
      this.checkOut = bookingData.checkOutDate;
    }
    console.log('Hotel:', this.hotel);
  }
 
  confirmBooking() {
    this.openBookingDetails = true;
    this.bookingConfirmed.emit({
      hotel: this.hotel,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    });
  }
 
  closeBooking() {
    this.close.emit();
    
    this.router.navigate(['/user/hotel-search']);
  }
  
  goBack() {
    this.router.navigate(['/user/hotel-search']);
  }
}
 
// Angular module
 
 