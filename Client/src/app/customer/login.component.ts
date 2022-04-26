import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-login',
  template:`
  <app-header view="login"></app-header>
  <form [formGroup]="loginForm" class="centerBox">
  <div style="width:100%;text-align:center;"><h3>Login</h3></div>
  <div class="form-group">
    <label for="email">Email address</label>
    <input formControlName="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
    <span *ngIf="loginForm.get('email').touched && loginForm.get('email').invalid" class="error-text">Please enter valid email</span>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input formControlName="password" type="password" class="form-control" id="password" placeholder="Password">
    <span *ngIf="loginForm.get('password').touched && loginForm.get('password').invalid" class="error-text">Please enter valid password</span>
  </div>

  <br>
  <button type="submit" (click)="login()" class="btn btn-primary">Login</button>
  <br>
  Don't have an account? <a [routerLink]="['../register']">Click here to register</a>
  </form>
 
  `
})
export class LoginComponent implements OnInit{
  loginForm:any;
  log:any;

  constructor(private fb:FormBuilder, private auth:AuthService){}

  ngOnInit(): void {
      this.loginForm = this.fb.group({
           password: ["", Validators.required],
           email : ['', [ Validators.required, Validators.pattern('.+@.+') ] ],
      });
      this.loginForm.valueChanges.subscribe((res:any) => this.log = res )
  }
  login(){
    let email=this.loginForm.get('email').value
    let password=this.loginForm.get('password').value
    this.auth.login(email,password)
  }
}    
