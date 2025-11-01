import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'hotelFilter',
  standalone: true
})
export class HotelFilterPipe implements PipeTransform {
  transform(hotels: any[], searchTerm: string): any[] {
    if (!searchTerm) return hotels;
    return hotels.filter(hotel =>
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
 