import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingData } from '../interfaces/bookingInterface';
import { HotelInterface } from '../interfaces/hotelInterface';

@Component({
  selector: 'app-booking-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './booking-details.html',
  styleUrls: ['./booking-details.css'],
  
})
export class BookingDetails {
 
 
  @Output() close = new EventEmitter<void>();
  @Input() selectedHotel:HotelInterface|null=null;
  bookingDeatails: BookingData[]=[];
 
 
bookingData: BookingData = {
  firstName: '',
  lastName: '',
  email: '',
  country: 'India',
  phone: '',
 
};
 
submitForm(form: any) {
    if (form.valid) {
      console.log(form)
      console.log('Booking submitted:', this.bookingData);
      this.bookingDeatails?.push(this.bookingData);
      console.log('Booking details:', this.bookingDeatails);
     
      // Show success alert
      alert('Booking Successfully Completed! 🎉\n\nThank you for your booking. You will receive a confirmation email shortly.');
      
      // Close the booking form
      this.close.emit();
    }
  }
  closeBooking() {
    this.close.emit();
  }
}