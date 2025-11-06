import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingData } from '../interfaces/bookingInterface';
import { HotelInterface } from '../interfaces/hotelInterface';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-booking-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './booking-details.html',
  styleUrls: ['./booking-details.css'],
  
})
export class BookingDetails {
 
 
  @Output() close = new EventEmitter<void>();
  @Input() selectedHotel:HotelInterface|null=null;
  bookingDetails: BookingData[]=[];

  constructor(private hotelService: HotelService) {}
 
 
bookingData: BookingData = {
  fullName: '',
  email: '',
  country: 'India',
  phone: '',
};
 
submitForm(form: any) {
    if (form.valid) {
       this.hotelService.createGuest(this.bookingData).subscribe({
        next: (response) => {
          console.log('Guest created successfully:', response);
          this.close.emit();
        },
        error: (error) => {
          console.error('Error creating guest:', error);
        }
      });
    }
  }
  closeBooking() {
    this.close.emit();
  }
}