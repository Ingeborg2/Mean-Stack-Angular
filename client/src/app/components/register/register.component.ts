import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  message;
  messageClass;
  processing = false; // will help us preventing the user from submitting the form twice
  // these will enable us to let the user know directly if username/email already exists in database = is taken
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      'username': ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        this.validateUsername
      ])
      ],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])
      ],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])
      ],
      'confirm': ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords)
  }

  disableRegisterForm(){
    this.registerForm.controls['email'].disable();
    this.registerForm.controls['username'].disable();
    this.registerForm.controls['password'].disable();
    this.registerForm.controls['confirm'].disable();
  }

  enableRegisterForm(){
    this.registerForm.controls['email'].enable();
    this.registerForm.controls['username'].enable();
    this.registerForm.controls['password'].enable();
    this.registerForm.controls['confirm'].enable();
  }

  onRegisterSubmit() {
    this.processing = true;
    this.disableRegisterForm();
    // getting the values of the registerForm
    const user = {
    email: this.registerForm.get('email').value,
    username: this.registerForm.get('username').value,
    password: this.registerForm.get('password').value
  }
  this.authService.registerUser(user).subscribe(data => {
    if(!data.success){
      this.messageClass = 'alert alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enableRegisterForm();
    } else {
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 2000 )
    }
  })
}

checkEmail(event:any){
  this.authService.checkEmail(this.registerForm.get('email').value).subscribe(data => {
    if(!data.success){
      this.emailValid = false;
      this.emailMessage = data.message;
    } else {
      this.emailValid = true;
      this.emailMessage = data.message;
    }
  })
}

checkUsername(event:any){
  this.authService.checkUsername(this.registerForm.get('username').value).subscribe(data => {
    if(!data.success){
      this.usernameValid = false;
      this.usernameMessage = data.message;
    } else {
      this.usernameValid = true;
      this.usernameMessage = data.message;
    }
  })
}


  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // when it passes the test and therefore is a valid email
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true }
    }
  }

  validateUsername(controls) {
     const regExp = new RegExp(/^[a-z0-9_-]+$/);
      if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateUsername': true }
    }
  }


  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,35}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true }
    }
  }

  matchingPasswords(password, confirm){
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value){
        return null;
      } else {
        return { 'matchingPaswords': true }
      }
    }
  }

  ngOnInit() {
  }

}
