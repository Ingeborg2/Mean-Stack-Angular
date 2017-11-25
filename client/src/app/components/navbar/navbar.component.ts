import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessagesService.show('You are logged out!', {
      classes: ['alert', 'alert-warning'], // You can pass as many classes as you need
      timeout: 4000, // Default is 3000
    });
    this.router.navigate(['/'])
  }

  ngOnInit() {
    
  }

}
