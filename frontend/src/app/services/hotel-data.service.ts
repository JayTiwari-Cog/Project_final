import { Injectable } from '@angular/core';
import { HotelInterface } from '../interfaces/hotelInterface';

@Injectable({
  providedIn: 'root'
})
export class HotelDataService {
  
  // Simple hotel data array
  private hotels: HotelInterface[] = [
    { id: 1, name: 'Ocean View Resort', location: 'Goa', price: 4500, rating: 4.5 },
    { id: 2, name: 'Mountain Escape Lodge', location: 'Manali', price: 3200, rating: 4.2 },
    { id: 3, name: 'City Central Inn', location: 'Mumbai', price: 2800, rating: 3.9 },
    { id: 4, name: 'Taj Palace', location: 'Delhi', price: 6500, rating: 4.8 },
    { id: 5, name: 'ITC Grand Bharat', location: 'Hyderabad', price: 5500, rating: 4.6 },
    { id: 6, name: 'Park Hyatt Chennai', location: 'Chennai', price: 5800, rating: 4.7 },
    { id: 7, name: 'Oberoi Grand', location: 'Kolkata', price: 5200, rating: 4.5 },
    { id: 8, name: 'JW Marriott', location: 'Bangalore', price: 4800, rating: 4.4 },
    { id: 9, name: 'Leela Palace', location: 'Pune', price: 4200, rating: 4.3 },
    { id: 10, name: 'Four Seasons', location: 'Jaipur', price: 5900, rating: 4.8 },
    { id: 11, name: 'Hilton Garden Inn', location: 'Kochi', price: 3800, rating: 4.1 },
    { id: 12, name: 'Radisson Blu', location: 'Goa', price: 4100, rating: 4.2 }
  ];

  constructor() {
    console.log('HotelDataService initialized');
  }

  // Get all hotels
  getHotels(): HotelInterface[] {
    return this.hotels;
  }

  // Get hotel by ID
  getHotelById(id: number): HotelInterface | undefined {
    return this.hotels.find(hotel => hotel.id === id);
  }

  // Search hotels by name or location
  searchHotels(searchTerm: string): HotelInterface[] {
    if (!searchTerm) return this.hotels;
    
    const term = searchTerm.toLowerCase();
    return this.hotels.filter(hotel => 
      hotel.name.toLowerCase().includes(term) || 
      hotel.location.toLowerCase().includes(term)
    );
  }

  // Get unique locations
  getUniqueLocations(): string[] {
    return [...new Set(this.hotels.map(hotel => hotel.location))].sort();
  }

  // Add a new hotel
  addHotel(hotel: Omit<HotelInterface, 'id'>): HotelInterface {
    const newId = this.hotels.length > 0 ? Math.max(...this.hotels.map(h => h.id)) + 1 : 1;
    const newHotel: HotelInterface = { ...hotel, id: newId };
    
    this.hotels.push(newHotel);
    console.log('New hotel added:', newHotel.name);
    return newHotel;
  }

  // Get hotels count
  getHotelsCount(): number {
    return this.hotels.length;
  }
}
