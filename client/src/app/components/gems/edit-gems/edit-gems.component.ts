import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GemsService } from '../../../services/gems.service';
import { Gem } from '../../../gem';

@Component({
  selector: 'app-edit-gems',
  templateUrl: './edit-gems.component.html',
  styleUrls: ['./edit-gems.component.css']
})
export class EditGemsComponent implements OnInit {
  form;
  createdOn;
  sparkles = [1, 2, 3, 4];
  sparkle;
  currentUrl;
  message;
  messageClass;
  loading = false;
  processing;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gemsService: GemsService
  ) {
    this.createEditForm();
  }

  createEditForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      forSale: [''],
      soldOut: [''],
      sparkle: ['', Validators.required],
      createdBy: [''],
      createdOn: [this.createdOn],
      updatedOn: [new Date()],
    });
  }

  updateGem(updatedGemstone) {
    this.processing = true; // Lock form fields
    updatedGemstone.sparkle = this.gemsService.countStars(updatedGemstone.sparkle)
    // Function to send gemstone object to backend
    this.gemsService.editGem(this.currentUrl.id, updatedGemstone).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to gemstones page
        setTimeout(() => {
          this.router.navigate(['/gemstones']); // Navigate back to gemstones page
        }, 2000);
      }
    });
  }


  ngOnInit() {    
    this.gemsService.createdOn.subscribe(createdOn => this.createdOn = createdOn);
    console.log('waarde is: ', this.createdOn)
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current gemstone with id in params
    this.gemsService.getSingleGem(this.currentUrl.id).subscribe(data => {      
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Gemstone not found.'; // Set error message
      } else {
          this.form.get('name').setValue(data.gems.name);
          this.form.get('price').setValue(data.gems.price);
          this.form.get('forSale').setValue(data.gems.forSale);
          this.form.get('soldOut').setValue(data.gems.soldOut);
          this.sparkle = this.form.get('sparkle').setValue(data.gems.sparkle.length);
          this.form.get('createdBy').setValue(data.gems.createdBy);
          this.form.get('createdOn').setValue(this.createdOn);
          this.form.get('updatedOn').setValue(new Date());
          //data.gems = this.form.value;
        }
        this.loading = true; // Allow loading of edit form
      });
  }
}
