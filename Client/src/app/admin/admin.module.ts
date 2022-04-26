import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from '../app.component';
import { StatusPipe } from './pipes/status.pipe';
import { AdminComponent } from './admin.component';
import { OrderDashboardComponent } from './orderDashboard.component';
import { SafeHtmlPipe } from './pipes/safehtml.pipe';
import { FirestoreService } from './services/firestore.service';
import { AdminHeaderComponent } from './adminHeader.component';
import { AdminHomeComponent } from './adminHome.component';



@NgModule({
  declarations: [
    AdminComponent,OrderDashboardComponent,SafeHtmlPipe,StatusPipe,AdminHeaderComponent,AdminHomeComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot([
     {path:'admin',component:AdminHomeComponent},
     {path:'admin/dashboard',component:OrderDashboardComponent}
    ]),
    FormsModule,ReactiveFormsModule,HttpClientModule

  ],
  providers: [FirestoreService],
  bootstrap: [AdminComponent]
})
export class AdminModule {}
