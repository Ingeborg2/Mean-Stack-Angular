import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  // Function to determine whether user is authorized to view route
  canActivate() {
    // Check if user is logged in
    if (this.authService.loggedIn()) {
      this.flashMessagesService.show('You are already logged in!', {
      classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
      timeout: 4000, // Default is 3000
    });
      this.router.navigate(['/']); // Return error, route to home
      return false; // Return false: user not allowed to view route
    } else {
      return true; // Return true: user is allowed to view route
    }
  }
}
