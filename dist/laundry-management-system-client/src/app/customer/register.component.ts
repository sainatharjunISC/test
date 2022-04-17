import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  template:`
  <app-header></app-header>
  <form [formGroup]="registerForm" class="centerBox">
  <div style="width:100%;text-align:center;"><h3>Register</h3></div>
  <div class="form-group">
    <label for="email">Email</label>
    <input formControlName="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="john@example.com">
    <span *ngIf="registerForm.get('email').touched && registerForm.get('email').invalid" class="error-text">Please enter valid email</span>
  </div>
  <div class="form-group">
    <label for="fullname">Full Name</label>
    <input formControlName="fullName" class="form-control" id="fullname" aria-describedby="emailHelp" placeholder="John Doe">
    <span *ngIf="registerForm.get('fullName').touched && registerForm.get('fullName').invalid" class="error-text">Please enter valid name</span>
  </div>
  <div class="form-group">
    <label for="phone">Phone</label>
    <input formControlName="phone" class="form-control" id="phone" aria-describedby="emailHelp" placeholder="134567890">
    <span *ngIf="registerForm.get('phone').touched && registerForm.get('phone').invalid" class="error-text">Please enter valid phone number</span>
  </div>
  <div class="form-group">
    <label for="address">Address</label>
    <textarea formControlName="address" class="form-control" id="address" aria-describedby="emailHelp" placeholder="Address"></textarea>
    <span *ngIf="registerForm.get('address').touched && registerForm.get('address').invalid" class="error-text">Please enter valid address</span>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input formControlName="password" type="password" class="form-control" id="password" placeholder="Password">
    <span *ngIf="registerForm.get('password').touched && registerForm.get('password').invalid" class="error-text">Please enter valid password</span>
  </div>
  <br>
  <button type="submit" (click)="signupWithEmail()" class="btn btn-primary">Sign Up</button>
  </form>
  `
})
export class RegisterComponent {
  title = 'lms';
  registerForm:any;
  log:any;

  constructor(private fb:FormBuilder,private auth: AuthService){}

  

  ngOnInit(): void {
      this.registerForm = this.fb.group({
           password: ["", Validators.required],
           email : ['', [ Validators.required, Validators.pattern('.+@.+') ] ],
           fullName:["", Validators.required],
           phone:["", [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
           address:["", Validators.required],
      },
      );
      this.registerForm.valueChanges.subscribe((res:any) => this.log = res )
  }

  signupWithEmail(){
    let email=this.registerForm.get('email').value
    let password=this.registerForm.get('password').value
    const user:any={
      fullName:this.registerForm.get('fullName').value,
      email:email,
      phone:this.registerForm.get('phone').value,
      address:this.registerForm.get('address').value,
      customerID:'',
    }
    this.auth.emailSignup(email,password,user)
  }

}
