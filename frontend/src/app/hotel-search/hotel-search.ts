import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelFilterPipe } from "./hotel-search.pipe";
import { GuestSelectorComponent } from '../guest-selector/guest-selector';
import { Booking } from "../booking/booking";
import { HotelService } from '../services/hotel.service';
import { AuthProvider } from '../services/auth.provider';
import { HotelInterface } from '../interfaces/hotelInterface';
 
@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HotelFilterPipe, GuestSelectorComponent],
  templateUrl: './hotel-search.html',
  styleUrls: ['./hotel-search.css']
})
export class HotelSearch implements OnInit {
  @Output() hotelSelected = new EventEmitter<{hotel: HotelInterface, checkInDate: string, checkOutDate: string}>();
  @Output() backToHome = new EventEmitter<void>();

  hotels=[];

  constructor(private hotelService:HotelService, private router: Router, private authProvider: AuthProvider) {}
   
  ngOnInit(): void {
    // AuthGuard already verified the token before this component loads
    // No need for manual token verification
    this.hotelService.getHotels().subscribe(hotels => {
      this.hotels = hotels;
      console.log(this.hotels);
    });

    this.searchTriggered = false;
  }

  searchTerm: string = '';
  searchTriggered: boolean = false;
  showGuestSelector: boolean = false;
  guestSelectionText: string = '2 adults · 0 children · 0room';
  searchButtonLabel:string='Search All';
  checkInDate: string = '';
  checkOutDate: string = '';
  dateError: string = '';
 
  selectedHotel: any | null = null;
  today: string = new Date().toISOString().split('T')[0];
 
  triggerSearch(form?: any) {
    this.dateError = '';

    // Only require dates, not the search term
    if (!this.checkInDate || !this.checkOutDate) {
      this.dateError = 'Please select both check-in and check-out dates.';
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);

    if (checkIn.getTime() < today.getTime()) {
      this.dateError = 'Check-in date cannot be in the past.';
      return;
    }

    if (checkOut.getTime() <= checkIn.getTime()) {
      this.dateError = 'Check-out date must be after check-in date.';
      return;
    }

    // If all validations pass, show all hotels (filtered by search term if provided)
    this.searchTerm = this.searchTerm ? this.searchTerm.trim() : '';
    this.searchTriggered = true;
  }
 
  toggleGuestSelector() {
    this.showGuestSelector = !this.showGuestSelector;
  }
 
  onGuestSelectionChange(selection: any) {
    this.guestSelectionText = `${selection.adults} adults · ${selection.children} children · ${selection.rooms} room`;
    // Keep the selector open while making changes
    this.showGuestSelector = true;
  }
 
  closeGuestSelector() {
    this.showGuestSelector = false;
  }
 
  // Handle clicks outside the selector
  // onDocumentClick(event: any) {
  //   if (!event.target.closest('.guest-selector-wrapper')) {
  //     this.closeGuestSelector();
  //   }
  // }
updateSearchLabel() {
  this.searchButtonLabel = this.searchTerm ? 'Search' : 'Search All';
}
 
bookHotel(hotel:any) {
  this.selectedHotel=hotel;
   const bookingData = {
    hotel: hotel,
    checkInDate: this.checkInDate,
    checkOutDate: this.checkOutDate
  };
  
  // Store booking data in session storage for the booking component
  sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
  
  // Navigate to booking component
  this.router.navigate(['/user/booking']);
  
  this.hotelSelected.emit(bookingData);
}

goHome(): void {
  this.router.navigate(['/home']);
}
}