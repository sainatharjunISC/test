import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';
import {environment} from '../environments/environment'
export const firebaseConfig = environment.firebaseConfig
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AdminModule } from './admin/admin.module';
import { SafeHtmlPipe } from './customer/pipes/safehtml.pipe';
import { StatusPipe } from './customer/pipes/status.pipe';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthService } from './customer/services/auth.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,RouterModule,CustomerModule,AdminModule,AngularFireModule.initializeApp(firebaseConfig),AngularFirestoreModule,
    AngularFireAuthModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
