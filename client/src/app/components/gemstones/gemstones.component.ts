import { Component, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { GemsService } from '../../services/gems.service';
import { Gem } from '../../gem';

@Component({
  selector: 'app-gemstones',
  templateUrl: './gemstones.component.html',
  styleUrls: ['./gemstones.component.css']
})
export class GemstonesComponent implements OnInit {
  gemstones;
  //name = this.gemstones[0].name;
  loadingGems = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private gemsService: GemsService
  ) { }

  sortBy(array, field) {
    array.sort(function (a, b) {
      if (a.field < b.field) {
        return -1;
      } else if (a.field > b.field) {
        return 1;
      } else {
        return 0;
      }
    });
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
      //console.log('data: ', data) // data = object with success and gems array
    });
  }

  ngOnInit() {
    this.getAllGems();
  }

}
