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
  isAsc = true;
  username;
  createdOn;
  isClickedId: null;
  selectedId;
  headers = [
    { id: 1, name: 'name' },
    { id: 2, name: 'sparkle' },
    { id: 3, name: 'price' },
    { id: 4, name: 'forSale' },
    { id: 5, name: 'createdBy' },
    { id: 6, name: 'createdOn' },
    { id: 7, name: 'updatedOn' },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private gemsService: GemsService,
    private authService: AuthService
  ) { }

  onSelect(head) {
    this.selectedId = head;
  }

   sortBy(field, isAsc, event) {
    let target = event.target || event.srcElement || event.current.target;
    let idAttr = target.attributes.id;  
    let value = idAttr.nodeValue; 
    let isClassVisible = true;

    if(this.isClickedId === undefined || null) {
      console.log("clicked1: ", this.isClickedId)
      console.log("a1: ", idAttr)
      console.log("t1: ", target)
      console.log("value: ", value)
      this.isAsc = true; 
      //isClassVisible = true;
      console.log("isAsc1: ", this.isAsc)     
    } else if (this.isClickedId === idAttr) {
      this.isAsc = !this.isAsc; //change the direction
      //isClassVisible = true;
      console.log("clicked2: ", this.isClickedId)
      console.log("a1: ", idAttr)
      console.log("t2: ", target)
      console.log("isAsc2: ", this.isAsc)
      console.log("value: ", value)
    } else {
      this.isClickedId = idAttr;
      
      console.log("clicked3: ", this.isClickedId)
      console.log("a1: ", idAttr)
      console.log("isAsC: ", this.isAsc)
      console.log("value: ", value)
    }
       
    if(this.isAsc){
      this.gemstones.sort((a,b) => a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0);
    } else {
      this.gemstones.sort((a,b) => a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0).reverse();
    }
   
    this.isClickedId = idAttr;
    
  }


/*@Input('sort-direction')
    sortDirection: string = '';

    @HostListener('click')
    sort() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }*/


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
