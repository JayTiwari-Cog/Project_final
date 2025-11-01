import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomInterface } from '../interfaces/roomInterface';
import { LocationInterface } from '../interfaces/locationInterface';
import { RoomService } from '../services/managerServices.service';
import { PricingService } from '../services/pricing.service';
@Component({
  selector: 'app-manager-add-hotel',
  templateUrl: './manager-add-hotel.html',
  styleUrls: ['./manager-add-hotel.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ManagerAddHotelComponent implements OnInit {
  @Output() homeRequested = new EventEmitter<void>();
  
  roomTypes: string[] = [];
  locations: LocationInterface[] = [];
  hotelChains: string[] = [];
 
  constructor(private roomService: RoomService, private pricingService: PricingService, private router: Router) {}

  ngOnInit(): void {
    
    this.roomTypes = this.roomService.getRoomTypes();
    this.locations = this.roomService.getLocations();
    this.hotelChains = this.roomService.gethotelChains();
  }
 
  selectedRoomType = '';
  selectedLocation = '';
  selectedHotelChain = '';
  pricePerNight = 0;
 
  amenities: { [key: string]: boolean } = {
    wifi: false,
    breakfast: false,
    roomService: false,
    iron: false,
    pool: false
  };
  get amenityKeys() {
    return Object.keys(this.amenities);
  }
 
  getLocationEmoji(locationName: string): string {
    return this.roomService.getLocationEmoji(locationName);
  }
 
  submittedRoom: RoomInterface | null = null;
 
  get selectedAmenities(): string[] {
    return this.amenityKeys.filter(key => this.submittedRoom?.amenities[key]);
  }

  // Method to calculate price automatically
  calculateAutomaticPrice(): void {
    if (this.selectedRoomType && this.selectedLocation && this.selectedHotelChain) {
      this.pricePerNight = this.pricingService.calculatePrice(
        this.selectedRoomType,
        this.selectedLocation,
        this.selectedHotelChain,
        this.amenities
      );
    } else {
      this.pricePerNight = 0;
    }
  }

  // Update price when room type changes
  onRoomTypeChange(): void {
    this.calculateAutomaticPrice();
  }

  // Update price when location changes
  onLocationChange(): void {
    this.calculateAutomaticPrice();
  }

  // Update price when hotel chain changes
  onHotelChainChange(): void {
    this.calculateAutomaticPrice();
  }

  // Update price when amenities change
  onAmenityChange(): void {
    this.calculateAutomaticPrice();
  }

  // Get price breakdown for display
  getPriceBreakdown() {
    if (this.selectedRoomType && this.selectedLocation && this.selectedHotelChain) {
      return this.pricingService.getPriceBreakdown(
        this.selectedRoomType,
        this.selectedLocation,
        this.selectedHotelChain,
        this.amenities
      );
    }
    return null;
  }

  submitRoom(form?: any) {
    if (form && form.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    if (!this.selectedRoomType || !this.selectedLocation || !this.selectedHotelChain) {
      alert('Please select room type, location, and hotel chain.');
      return;
    }

    // Ensure price is calculated
    this.calculateAutomaticPrice();
    
    if (this.pricePerNight <= 0) {
      alert('Unable to calculate price. Please check your selections.');
      return;
    }
 
    this.submittedRoom = {
      type: this.selectedRoomType,
      price: this.pricePerNight,
      location: this.selectedLocation,
      hotelChain: this.selectedHotelChain,
      amenities: { ...this.amenities }
    };
 
    alert('Room added successfully!');
    this.resetForm();
    if (form) form.resetForm();
  }
 
  resetForm() {
    this.selectedRoomType = '';
    this.selectedLocation = '';
    this.selectedHotelChain = '';
    this.pricePerNight = 0;
    this.amenityKeys.forEach(key => this.amenities[key] = false);
  }

  goHome() {
    this.homeRequested.emit();
  }

  goBackToDashboard() {
    this.router.navigate(['/manager/dashboard']);
  }
}
 
 
 
 
 