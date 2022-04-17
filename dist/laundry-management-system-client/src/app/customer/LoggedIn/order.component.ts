import { Attribute, Component,Input,OnInit, Optional } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';

interface data{
  clothes:[{clothID:string,clothType:string,clothColor:string}];
  customerID:string;
  orderID:string;
  timeStamp:number;
  status:string;
  service:string;
}
@Component({
  selector: 'app-order',
  template:`
  <app-header view="order"></app-header>
  <div class="centerBox">
  <label for="serviceType"><h4>Choose a service</h4></label>
  <select #serviceType (change)="service=serviceType.value" class="form-input" name="serviceType" id="serviceType">
    <option selected hidden>Select an option</option>
    <option value="Washing">Washing</option>
    <option value="Ironing">Ironing</option>
  </select>
  
  <ol class="orderList list-group">
   <li class="list-group-item" *ngFor="let i of clothList">
   <select name="clothType" #clothType class="clothType" (change)="i.clothType=clothType.value">
   <option selected hidden>Cloth Type</option>
   <option value="Shirt">Shirt</option>
   <option value="Pant">Pant</option>
   <option value="Saree">Saree</option>
   <option value="Salwar">Salwar</option>
   <option value="Dhoti">Dhoti</option>
   <option value="Jersey">Jersey</option>
   <option value="Suit">Suit</option>
   </select>   
   <select #clothColor  (change)="i.clothColor=clothColor.value" name="clothColor" class="clothColor">
   <option selected hidden>Cloth Color</option>
   <option value="White">White</option>
   <option value="Others">Others</option>
   </select> 

   <button (click)="removeFromList(i)" class="btn btn-danger" style="line-height:20px" >-</button>
   </li>
  </ol>     
  

  <button (click)="appendToList()" class="btn btn-primary">+</button>
  <button (click)="placeOrder()" class="btn btn-success">Place Order</button>
  </div>
  `,
  styles:[`
  select{
    width:30%;
    padding:3px;
    border:none;
    background-color:white;
    border-radius:1mm;
    margin:0 20px;
  }
  .centerBox{
    background-color:white;
    padding:30px
  }
  .btn{
    margin:20px;
  }
  `] 
})
export class OrderComponent {
  title = 'lms';
  orderID = sessionStorage['customerID']+Math.round(Math.random()*10000).toString();
  clothIDSuffix:any=100;
  clothList:any=[{
    clothID:this.orderID+this.clothIDSuffix,
    clothType:'',
    clothColor:''
  }]
  service:any="";
  
  constructor(private afs:AngularFirestore,private router: Router){}
  ngOnInit(){
    if(!sessionStorage['customerID']){
      this.router.navigateByUrl('login');
    }
  }

  ordersCollection!: AngularFirestoreCollection<data>;
  removeFromList=(i:any)=>{
    var index = this.clothList.indexOf(i);
    if (index > -1) {
        this.clothList.splice(index, 1);
    }
  }
  
  appendToList(){
    this.clothIDSuffix=this.clothIDSuffix+1
    let obj =
        {
          clothID:this.orderID+this.clothIDSuffix,
          clothType:'',
          clothColor:''
        }
    this.clothList.push(obj);
    console.log(this.clothList)
  }

  placeOrder(){
    this.ordersCollection = this.afs.collection('Orders');
    if(this.service==""){
      alert('Please select the required service');
      return;
    }
    this.clothList.forEach((cloth:any) => {
      if(cloth.clothType==""||cloth.clothColor==""){
        alert('Please select both cloth type and color')
        return;
      }
    });
   let timeStamp = Date.now();
   const order:any={
     clothes:this.clothList,
     customerID:sessionStorage['customerID'],
     orderID:this.orderID,
     service:this.service,
     status:'Order received',
     timeStamp:timeStamp,
     totalItems:this.clothList.length
   }  
    // console.log(order)
    this.ordersCollection.add(order)
    .then((res)=>{alert('Order Placed Successfuly')})
    .catch((err)=>{console.log(err);
      alert('Please fill all details')})
    
  }
}
