import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/map";

@Injectable()
export class GemsService {
  domain = this.authService.domain;
  options;
  gemstones; 

  private createdOnSubject = new BehaviorSubject<Array<any>>([]);
    createdOn = this.createdOnSubject.asObservable();

  getCreatedOn(createdOn) {
    this.createdOnSubject.next(createdOn);
  }  

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  countStars(sparkle) {
    let stars = "";
    for (let i = 0; i < sparkle; i++) {
      stars += "*";
    }
    return stars;
  }  

  // METHOD TO CREATE HEADERS
  createAuthenticationHeaders(){
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers ({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    })
  }

  // METHOD TO CREATE NEW GEM
  newGem(gemstone) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + '/gems/newGem', gemstone, this.options)
      .map(res => res.json());
  }

  // METHOD TO GET ALL GEMS
  getAllGems() {
    this.createAuthenticationHeaders(); 
    return this.http.get(this.domain + '/gems/allGems', this.options)
      .map(res => res.json());
  }

  // METHOD TO GET ONE GEM
  getSingleGem(id) {
    this.createAuthenticationHeaders(); 
    return this.http.get(this.domain + '/gems/singleGem/' + id, this.options)
    .map(res => res.json());
  }

  // METHOD TO UPDATE A GEM
  editGem(id, updatedGemstone) {
    let updatedGemstoneString = JSON.stringify(updatedGemstone);
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + '/gems/updateGem/' + id , updatedGemstoneString, this.options)
      .map(res => res.json());
  }

  // METHOD TO DELETE A GEM
  deleteGem(id) {
    this.createAuthenticationHeaders(); 
    return this.http.delete(this.domain + '/gems/deleteGem/' + id, this.options)
      .map(res => res.json());
  }

}
