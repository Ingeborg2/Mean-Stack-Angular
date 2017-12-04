import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GemsService } from '../../../services/gems.service';
import { AuthService } from '../../../services/auth.service';
import { Gem } from '../../../gem';


@Component({
  selector: 'app-gemstones',
  templateUrl: './gemstones.component.html',
  styleUrls: ['./gemstones.component.css']
})
export class GemstonesComponent implements OnInit {
  gemstones;
  loadingGems = false;
  isDesc;
  username;
  createdOn;

  constructor(
    private formBuilder: FormBuilder,
    private gemsService: GemsService,
    private authService: AuthService
  ) { }


  sortBy(field) {
    this.gemstones.sort((a,b) => a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
    this.isDesc = !this.isDesc; //change the direction    
    if(!this.isDesc){
      this.gemstones.sort((a,b) => a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0).reverse();
    }
  }

  reloadGems() {
    this.loadingGems = true;
    this.getAllGems();
    setTimeout(() => {
      this.loadingGems = false;
    }, 4000)
  }

  getAllGems() {
    // GET ALL GEMSTONES FROM DATABASE
    this.gemsService.getAllGems().subscribe(data => {
      this.gemstones = data.gems; // Assign array to use in HTML
    });
  }

  ngOnInit() {
    this.gemsService.createdOn.subscribe(createdOn => this.createdOn = createdOn);
    this.getAllGems();
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; 
    });
    
  }

}
