import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ManagerAddUserService, UserBookingData } from '../services/manager-add-user.service';

@Component({
  selector: 'app-manager-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-add-user.html',
  styleUrls: ['./manager-add-user.css']
})
export class ManagerAddUserComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<UserBookingData>();

  // Form data properties
  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  selectedLocation: string = '';
  selectedHotel: string = '';
  selectedRoomType: string = '';
  numberOfGuests: number = 1;

  // Validation properties
  showFormErrors: boolean = false;

  // Dropdown options (same as maintenance hotels for consistency)
  locations: string[] = [
    'Downtown',
    'Beachfront',
    'Business District', 
    'Mountain Area',
    'City Center',
    'Riverside',
    'Suburbs',
    'Airport Area',
    'Historic District',
    'Entertainment District'
  ];

  hotels: string[] = [
    'Grand Palace Hotel',
    'Ocean View Resort', 
    'City Center Inn',
    'Mountain Lodge',
    'Sunset Beach Hotel',
    'Downtown Business Hotel',
    'Riverside Resort',
    'Garden View Inn',
    'Metropolitan Hotel',
    'Lakeside Resort'
  ];

  roomTypes: string[] = [
    'Standard Single',
    'Standard Double',
    'Deluxe Single',
    'Deluxe Double',
    'Suite',
    'Presidential Suite',
    'Family Room',
    'Business Room'
  ];

  today: string = '';

  constructor(private managerAddUserService: ManagerAddUserService, private router: Router) {}

  ngOnInit(): void {
    // Initialize today's date
    this.today = this.managerAddUserService.getTodayDate();
  }

  onSubmit(form: NgForm) {
    if (this.isFormValid() && this.areDatesValid()) {
      const bookingData: UserBookingData = {
        name: this.userName,
        email: this.userEmail,
        phone: this.userPhone,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        hotelLocation: this.selectedLocation,
        hotelName: this.selectedHotel,
        roomType: this.selectedRoomType,
        numberOfPeople: this.numberOfGuests
      };

      try {
        const bookingId = this.managerAddUserService.createUserBooking(bookingData);
        alert(`User booking created successfully! Booking ID: ${bookingId}`);
        this.userAdded.emit(bookingData);
        this.resetForm(form);
        this.showFormErrors = false;
      } catch (error) {
        console.error('Error creating user booking:', error);
        alert('Failed to create user booking. Please try again.');
      }
    } else {
      this.showFormErrors = true;
      console.log('Form validation failed. Please fill in all required fields.');
    }
  }

  private isFormValid(): boolean {
    return this.userName.trim() !== '' &&
           this.userEmail.trim() !== '' &&
           this.userPhone.trim() !== '' &&
           this.checkInDate !== '' &&
           this.checkOutDate !== '' &&
           this.selectedLocation !== '' &&
           this.selectedHotel !== '' &&
           this.selectedRoomType !== '';
  }

  areDatesValid(): boolean {
    if (!this.checkInDate || !this.checkOutDate) return false;
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return checkIn >= today && checkOut > checkIn;
  }

  getNumberOfNights(): number {
    if (!this.checkInDate || !this.checkOutDate) return 0;
    const checkIn = new Date(this.checkInDate);
    const checkOut = new Date(this.checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.userName = '';
    this.userEmail = '';
    this.userPhone = '';
    this.checkInDate = '';
    this.checkOutDate = '';
    this.selectedLocation = '';
    this.selectedHotel = '';
    this.selectedRoomType = '';
    this.numberOfGuests = 1;
    this.showFormErrors = false;
  }

  onClose() {
    this.close.emit();
  }

  goBackToDashboard() {
    this.router.navigate(['/manager/dashboard']);
  }
}
