import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
  
import { CustomerComponent } from './customer.component';
import { HeaderComponent } from './header.component';
import { HomeComponent } from './home.component';
import { OrderComponent } from './LoggedIn/order.component';
import { StatusComponent } from './LoggedIn/status.component';
import { LoginComponent } from './login.component';
import { SafeHtmlPipe } from './pipes/safehtml.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { RegisterComponent } from './register.component';
import { ProgressDirective } from './directives/progress.directive'
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    CustomerComponent, HeaderComponent,LoginComponent,HomeComponent,RegisterComponent,OrderComponent,
    SafeHtmlPipe,StatusComponent,StatusPipe,ProgressDirective
  ],
  imports: [
    BrowserModule, RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'order',component:OrderComponent},
      {path:'status',component:StatusComponent},

    ]),
    FormsModule,ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [CustomerComponent]
})
export class CustomerModule {}
