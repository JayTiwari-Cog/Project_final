import { Injectable, inject } from '@angular/core';
import { HotelInterface } from '../interfaces/hotelInterface';
import { HotelDataService } from './hotel-data.service';
 
@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private hotelDataService = inject(HotelDataService);

  constructor() {
    console.log('HotelService initialized');
  }

  // Get all hotels
  getHotels(): HotelInterface[] {
    return this.hotelDataService.getHotels();
  }

  getHotelById(id: number): HotelInterface | undefined {
    return this.hotelDataService.getHotelById(id);
  }


  
}
 
 