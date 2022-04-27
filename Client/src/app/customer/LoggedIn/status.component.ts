import { Attribute, Component,ElementRef,Input,OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
interface data{
  clothes:[{clothID:string,clothType:string,clothColor:string}];
  customerID:string;
  orderID:string;
  timeStamp:string;
  status:string;
  service:string;
}
@Component({
  selector: 'app-status',
  template:`
  <app-header view="status"></app-header>
  <div class="row">
  <div class="col-sm-4 sideNavContainer">
  <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style="width: 380px;height:100%">
    <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-5 fw-semibold">Orders</span>
    </a>
    <div class="list-group list-group-flush border-bottom scrollarea" *ngFor="let order of orders | async">
      
      <a #orderLink (click)="setOrder(order)"  class="list-group-item list-group-item-action py-3 lh-tight">
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1" [innerHtml]="order.status | status | safeHtml"></strong>
          <small class="text-muted">{{ order.timeStamp | date:'dd/MM/yyyy' }}</small>
        </div>
        <div class="col-10 mb-1 small">Order Id:{{ order.orderID }}</div>
      </a>
    </div>
  </div>
  </div>
  <div class="col-sm-8">
  <div class="nothingToShow" *ngIf="!orderID"><h3 *ngIf="orders">Click on an order to view its status</h3></div>
  <div class="metadata"><h3>{{service}}</h3></div>
  <div class="metadata" *ngIf="orderID" ><h5>Order ID: {{orderID}}</h5></div>
  <div class="progressBox" *ngIf="progressHtml">
  <h5>Status</h5>
  <div [innerHTML]="progressHtml | safeHtml" class="progress">
  </div>
  <div class="metadata" *ngIf="totalItems" style="margin-left:0" ><h5>Total number of items: {{totalItems}}</h5></div>
  <table class="table table-striped" *ngIf="clothList">
  <thead>
    <tr>
      <th scope="col">ClothID</th>
      <th scope="col">Cloth Type</th>
      <th scope="col">Color</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let cloth of clothList">
      <th scope="row">{{cloth.clothID}}</th>
      <td>{{cloth.clothType}}</td>
      <td>{{cloth.clothColor}}</td>

    </tr>
  </tbody>
</table>
</div>
</div>
</div>
  `,
  styles:[`
  a{
    cursor:pointer;
  }
  .metadata{
    margin:30px 0 0 30px
  }
  .table{
    margin:40px 0;
  }
  .nothingToShow{
    width:100%;
    height:100%;
    display: grid;
  }
  .nothingToShow h3{
    margin: auto;
  }
  `]
})
export class StatusComponent {
  title = 'lms';
  progressHtml:any=""
  @Input() status=""
  service:any=""
  orderID:any=""
  clothList!:any;
  totalItems!:any;
  constructor(
  private afs:AngularFirestore
  ,private router: Router
  ){}

  ordersCollection!: AngularFirestoreCollection<data>;
  orders!: Observable<data[]>
  //test=this.firestore.fetchOrders('1234567');
  
  ngOnInit(){
    if(!sessionStorage['customerID']){
      this.router.navigateByUrl('login');
    }
    this.ordersCollection = this.afs.collection('Orders',ref => ref.where('customerID','==',sessionStorage['customerID']).orderBy('timeStamp'));
    this.orders=this.ordersCollection.valueChanges()
  }
  setOrder(order:any){
    if(order.status=="Order received"){
      this.progressHtml= '<div class="progress-bar bg-info" role="progressbar" style="width: 5%" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>   <span style="margin-left:10px">Order received</span>     '
    }
    if(order.status=="Preparing to wash"){
      this.progressHtml= '<div class="progress-bar bg-warning" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Preparing to wash</div>        '
    }
    else if(order.status=="Washing"){
      this.progressHtml= '  <div class="progress-bar" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">Washing</div>        '
    }
    else if(order.status=="Drying"){
      this.progressHtml= '  <div class="progress-bar" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">Drying</div>        '
    }
    else if(order.status=="Ironing"){
      this.progressHtml= '  <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">Ironing</div>        '
    }
    else if(order.status=="Ready to pick up"){
      this.progressHtml= '  <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Ready to pick up</div>        '
    }
    this.service=order.service;
    this.orderID=order.orderID
    this.clothList=order.clothes;
    this.totalItems=order.totalItems;
    console.log(order)
    return

  }  
}

///progressDirective pending