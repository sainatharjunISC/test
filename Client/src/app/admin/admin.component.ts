import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  template:`
  <router-outlet></router-outlet>
  ` 
})
export class AdminComponent {
  title = 'lms';
  constructor(private router:Router){}
  ngOninit(){
    if(sessionStorage['customerID']!='ScWsFNvm30lvIn59zdqd'){
      this.router.navigateByUrl('login');
    }
  }
}
