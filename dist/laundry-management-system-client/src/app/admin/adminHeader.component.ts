import { Component, Input } from '@angular/core';
import { AuthService } from '../customer/services/auth.service';

@Component({
  selector: 'app-adminHeader',
  template:`
  <div class="headerContainer cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="mb-auto">
    <div>
      <h3 class="float-md-start mb-0">Noble Laundry</h3>
      <nav class="nav nav-masthead justify-content-center float-md-end">
        <a class="nav-link" [class.active]="view=='home'"  [routerLink]="['../../admin']" >Home</a>
        <a class="nav-link" [class.active]="view=='dashboard'" [routerLink]="['../admin/dashboard']" >Dashboard</a>
        <a class="nav-link" (click)="logout()" *ngIf="user">Log out</a>

        </nav>
    </div>
  </header>
  </div>`
})
export class AdminHeaderComponent {
  title = 'lms';
  @Input() view:any;
  user:any=sessionStorage['customerID']

  constructor(
    private auth:AuthService
  ){}

  logout(){
    this.auth.logout()
  }
}
