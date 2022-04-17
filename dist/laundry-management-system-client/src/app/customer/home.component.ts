import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template:`<app-header view="home"></app-header>
  <div class="col-sm-12" style="text-align:center;background-color:rgba(0,0,0,0.5);z-index:10;position:absolute; "><img src="assets/img3.jpg" style="height:87vh;z-index:-10">
  <div id="overlay">
  <div id="text">Laundry with perfection and punctuality</div>
</div>
  </div>  `

})
export class HomeComponent {
  title = 'lms';
  user=sessionStorage['username'];
  constructor(private router:Router){}
  ngOnInit(){
    if(this.user=='Admin'){
      this.router.navigateByUrl('admin')
    }
  }
}
