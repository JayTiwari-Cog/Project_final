import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { GuestLoginComponent } from './guest-login/guest-login.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { HotelSearch } from './hotel-search/hotel-search';
import { Booking } from './booking/booking';
import { FeedbackForm } from './feedback-form/feedback-form';
import { ManagerDashboardComponent } from './managerdashboard/managerdashboard';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { ManagerAddUserComponent } from './manager-add-user/manager-add-user';
import { ManagerAddHotelComponent } from './manager-add-hotel/manager-add-hotel';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'guest-login', component: GuestLoginComponent },
  { path: 'manager-login', component: ManagerLoginComponent },
  
  // User routes
  { 
    path: 'user', 
    children: [
      { path: 'hotel-search', component: HotelSearch },
      { path: 'booking', component: Booking },
      { path: 'my-bookings', component: MyBookingsComponent },
      { path: 'feedback', component: FeedbackForm },
      { path: '', redirectTo: 'hotel-search', pathMatch: 'full' }
    ]
  },
  
  // Manager routes
  { 
    path: 'manager', 
    children: [
      { path: 'dashboard', component: ManagerDashboardComponent },
      { path: 'add-user', component: ManagerAddUserComponent },
      { path: 'add-hotel', component: ManagerAddHotelComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  // Legacy routes for backward compatibility (will be removed later)
  { path: 'hotel-search', redirectTo: 'user/hotel-search' },
  { path: 'booking', redirectTo: 'user/booking' },
  { path: 'my-bookings', redirectTo: 'user/my-bookings' },
  { path: 'feedback', redirectTo: 'user/feedback' },
  { path: 'manager-dashboard', redirectTo: 'manager/dashboard' },
  { path: 'manager-add-user', redirectTo: 'manager/add-user' },
  { path: 'manager-add-hotel', redirectTo: 'manager/add-hotel' },
  
  { path: '**', redirectTo: '' }
];
