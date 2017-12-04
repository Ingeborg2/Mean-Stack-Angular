import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GemsService } from '../../../services/gems.service';
import { Gem } from '../../../gem';

@Component({
  selector: 'app-delete-gems',
  templateUrl: './delete-gems.component.html',
  styleUrls: ['./delete-gems.component.css']
})
export class DeleteGemsComponent implements OnInit {
  processing;
  currentUrl;
  message;
  messageClass;
  loading = false;
  gemstone;

  constructor(
    private gemsService: GemsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  deleteGem() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    console.log(this.currentUrl)
    this.gemsService.deleteGem(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to blog page
        setTimeout(() => {
          this.router.navigate(['/gemstones']); // Route users to gemstones page
        }, 2000);
      }
    });
  }


  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve one gemstone
    this.gemsService.getSingleGem(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = 'You are not authorized to delete this gemstone.'; 
      } else {
        //Create the gemstone object to use in HTML
        this.gemstone = {
          name: data.gems.name, 
          price: data.gems.price,
          sparkle: data.gems.sparkle,
          createdBy: data.gems.createdBy,
          createdOn: data.gems.createdOn
        }
        this.loading = true; // Display gemstones modal window
      }
    });
  }

}
