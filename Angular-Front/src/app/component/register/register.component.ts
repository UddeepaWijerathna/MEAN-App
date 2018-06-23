import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
  }
  registerData(){

    const user = {
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    };
    //registerUser function(user data)
    this.authService.registerUser(user).subscribe(res=>{
      console.log(res);
    });
  }

}
