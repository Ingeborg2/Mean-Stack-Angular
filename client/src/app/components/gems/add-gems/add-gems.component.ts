import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { GemsService } from '../../../services/gems.service';
import { Gem } from '../../../gem';

@Component({
  selector: 'app-add-gems',
  templateUrl: './add-gems.component.html',
  styleUrls: ['./add-gems.component.css']
})
export class AddGemsComponent {
  form;
  sparkles = [1, 2, 3, 4];
  processing = false;
  message;
  messageClass;
  username;
  createdOn;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private gemsService: GemsService,
    private router: Router,
  ) {
    
    this.createNewGemsForm();
  }

  createNewGemsForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      forSale: [''],
      soldOut: [''],
      sparkle: ['', Validators.required],
      createdBy: [''],
      createdOn: [new Date()],
      updatedOn: [null],
    })
  }

  // SUBMIT GEM
  submitGem() {
    this.processing = true; // Disable submit button
    this.disableForm(); // Lock form
    // Create blog object from form fields
    const gem = new Gem(
      this.form.get('name').value,
      this.form.get('price').value,
      this.form.get('forSale').value,
      this.form.get('soldOut').value,
      this.gemsService.countStars(this.form.get('sparkle').value),
      this.username,
      this.form.get('createdOn').value,
      this.form.get('updatedOn').value,
    )
    this.createdOn = this.gemsService.getCreatedOn(this.form.get('createdOn').value);
    console.log("wat bewaren we in createdOn?", this.form.get('createdOn').value )
    this.form.reset({forSale: '', soldOut:'', createdOn: new Date()});
    // Save gem into database
    this.gemsService.newGem(gem).subscribe(data => {
      // Check if gemstone was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message
        // Clear form data after two seconds and redirect to gemstones page
        this.form.reset({ forSale: '', soldOut: '', createdBy: this.username, createdOn: new Date() }); // Reset all form fields
        setTimeout(() => {
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message

          this.enableForm(); // Enable the form fields
          this.router.navigate(['/gemstones']);
        }, 2000);
      }
    });
  }

  // ENABLE FORM
  enableForm() {
    this.form.get('name').enable();
    this.form.get('price').enable();
    this.form.get('forSale').enable();
    this.form.get('soldOut').enable();
    this.form.get('sparkle').enable();
    this.form.get('createdBy').enable();
    this.form.get('createdOn').enable();
    this.form.get('updatedOn').enable();
  }

  // DISABLE FORM
  disableForm() {
    this.form.get('name').disable();
    this.form.get('price').disable();
    this.form.get('forSale').disable();
    this.form.get('soldOut').disable();
    this.form.get('sparkle').disable();
    this.form.get('createdBy').disable();
    this.form.get('createdOn').disable();
    this.form.get('updatedOn').disable();
  }

  getUser(){
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // for the createdBy in the new Gem Object
    });
  }

  ngOnInit() {
    this.getUser();
  }

}
