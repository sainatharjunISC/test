import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class FirestoreService {
    constructor(private http: HttpClient) {}
    
    startWash(orderID:any,totalItems:any) {
        return this.http.post('https://laundrymanagementsystem51001.herokuapp.com/washProcess/'+orderID+'/'+totalItems,orderID)
    }
    startIron(orderID:any,totalItems:any) {
      return this.http.post('https://laundrymanagementsystem51001.herokuapp.com/ironProcess/'+orderID+'/'+totalItems,orderID)
  }
    
}