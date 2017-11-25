import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message;
  messageClass;
  processing;
  previousUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
     });
  }

   disableLoginForm(){
    this.loginForm.controls['username'].disable();
    this.loginForm.controls['password'].disable();
  }

  enableLoginForm(){
    this.loginForm.controls['username'].enable();
    this.loginForm.controls['password'].enable();
  }

  onLoginSubmit(){
    this.processing = true;
    this.disableLoginForm();
    // getting the values of the loginForm
    const user = {
    username: this.loginForm.get('username').value,
    password: this.loginForm.get('password').value
  }
  this.authService.login(user).subscribe(data => {
    if(!data.success){
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableLoginForm();
    } else {
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      this.authService.storeUserData(data.token, data.user);
      setTimeout(() => {
        if(this.previousUrl){
          this.router.navigate([this.previousUrl])
        } else {
          this.router.navigate(['/dashboard']);
        }
      }, 2000 )
    }
  });
  }

  ngOnInit(){
      if(this.authGuard.redirectUrl){
        this.messageClass = 'alert alert-danger';
        this.message = 'You must be logged in to view this page';
        this.previousUrl = this.authGuard.redirectUrl;
        this.authGuard.redirectUrl = undefined;
      }
  }

}
