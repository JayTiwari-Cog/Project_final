import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
 
export interface GuestSelection {
  adults: number;
  children: number;
  rooms: number;
}
 
@Component({
  selector: 'app-guest-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guest-selector.html',
  styleUrls: ['./guest-selector.css']
})
export class GuestSelectorComponent {
  @Input() isVisible: boolean = false;
  @Output() selectionChange = new EventEmitter<GuestSelection>();
  @Output() close = new EventEmitter<void>();
 
  selection: GuestSelection = {
    adults: 2,
    children: 0,
    rooms: 1
  };
 
  increment(type: 'adults' | 'children' | 'rooms'): void {
    if (this.selection[type] < 10) {
      this.selection[type]++;
      this.emitChange();
    }
    // Prevent event bubbling
    event?.stopPropagation();
  }
 
  decrement(type: 'adults' | 'children' | 'rooms'): void {
    if (this.selection[type] > (type === 'adults' ? 1 : 0)) {
      this.selection[type]--;
      this.emitChange();
    }
    // Prevent event bubbling
    event?.stopPropagation();
  }
 
  private emitChange(): void {
    this.selectionChange.emit(this.selection);
  }
 
  closeSelector(): void {
    this.close.emit();
  }
 
  getSelectionText(): string {
    const adultsText = this.selection.adults === 1 ? '1 adult' : `${this.selection.adults} adults`;
    const childrenText = this.selection.children === 0 ? '' : 
                        this.selection.children === 1 ? '1 child' : `${this.selection.children} children`;
    const roomsText = this.selection.rooms === 1 ? '1 room' : `${this.selection.rooms} rooms`;
    
    const parts = [adultsText];
    if (childrenText) parts.push(childrenText);
    parts.push(roomsText);
    
    return parts.join(' · ');
  }
}