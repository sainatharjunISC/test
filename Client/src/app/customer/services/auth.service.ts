import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import 'rxjs/operators';

interface user{
  fullName:string;
  email:string;
  phone:string;
  address:string;
  customerID:string;
}
@Injectable()
export class AuthService {
  private usersCollection!: AngularFirestoreCollection<user>;
  currentUser:any;
  users!: Observable<user[]>;
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router) {
      this.usersCollection = afs.collection<user>('Customers');
    this.users = this.usersCollection.valueChanges({ idField: 'customID' });
    }
    


  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((value:any) => {
      if(email=='admin@noblelaundry.com'){
        this.usersCollection=this.afs.collection('Admin',ref=>ref.where('email','==',email))
        this.users=this.usersCollection.valueChanges();
        this.users.subscribe((user:any)=>{
        sessionStorage['customerID']=user[0].customerID;
        sessionStorage['username']=user[0].fullName;
        sessionStorage['userObj']=JSON.stringify(user[0])
        this.router.navigateByUrl('admin/dashboard');
      })
     
      }
      else{
      this.usersCollection=this.afs.collection('Customers',ref=>ref.where('email','==',email))
      this.users=this.usersCollection.valueChanges();
      this.users.subscribe((user:any)=>{
      sessionStorage['customerID']=user[0].customerID;
      sessionStorage['username']=user[0].fullName;
      sessionStorage['userObj']=JSON.stringify(user[0])
      this.router.navigateByUrl('order');
    })
    
      }



    })
    .catch((err:any) => {
      alert(err.message)
      console.log('Something went wrong: ', err.message);
    });
  }

  emailSignup(email: string, password: string, userObj:any) {
   
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((value:any) => {
      console.log('Sucess', value);
      const id = this.afs.createId();
      userObj.customerID=id;
      this.usersCollection.doc(id).set(userObj).then((res:any)=>{
        console.log(res)
        alert('User successfully registered. Please login to continue.')
         this.router.navigateByUrl('/login');
    });
    })
    .catch((error:any) => {
      console.log('Something went wrong: ', error);
      alert(error.message)
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then((value:any) => {
     console.log('Sucess', value),
     this.router.navigateByUrl('/profile');
   })
    .catch((error:any) => {
      console.log('Something went wrong: ', error);
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      sessionStorage.clear()
      this.router.navigateByUrl('');
      if(this.router.url=='/'){
        location.reload()
      }
     
    });
  }

  private oAuthLogin(provider:any) {
    return this.afAuth.auth.signInWithPopup(provider);
  }
}