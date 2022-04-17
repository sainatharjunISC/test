import { Component, Input } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-header',
  template:`
  <div class="headerContainer cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="mb-auto">
    <div>
      <h3 class="float-md-start mb-0">Noble Laundry</h3>
      
      <nav class="nav nav-masthead justify-content-center float-md-end">
        <a class="nav-link" [class.active]="view=='home'"  [routerLink]="['../']" >Home</a>
        <a class="nav-link" *ngIf="!user" [class.active]="view=='login'" [routerLink]="['../login']" >Login</a>
        <a class="nav-link" *ngIf="user" [class.active]="view=='order'" [routerLink]="['../order']" >Order now</a>
        <a class="nav-link" *ngIf="user" [class.active]="view=='status'" [routerLink]="['../status']" >Status</a>
        <a class="nav-link" (click)="logout()" *ngIf="user">Log out</a>
        <a class="nav-link" id="userTab" *ngIf="user">Hello {{username}}</a>
        </nav>
    </div>
  </header>
  </div>`,
  styles:[
    `
    #userTab{
      cursor:default;
      text-decoration:underline;
    }
    `
  ]
})
export class HeaderComponent {
  title = 'lms';
  @Input() view:any;
  user:any=sessionStorage['customerID']
  username:any=sessionStorage['username']
  
  constructor(
    private auth:AuthService
  ){}

  logout(){
    this.auth.logout()
  }
}
