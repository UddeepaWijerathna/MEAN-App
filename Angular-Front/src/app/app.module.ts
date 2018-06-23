import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
//import Auth Service.
         // AuthService class
import { AuthService } from './service/auth.service';

//routes
const applicationRoutes:Routes = [
  //load login component
  {path:'login',component:LoginComponent},
  //load register components
  {path:'register',component:RegisterComponent},
  // {path:'profile',component:ProfileComponent,canActivate: [AuthGuard]},


];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(applicationRoutes)
  ],
  // register the auth service in providers
  providers: [AuthService],
  bootstrap: [AppComponent] // run appcomponent file
})
export class AppModule { }
