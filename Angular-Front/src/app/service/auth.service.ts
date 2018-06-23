import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
// import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//type of the user object is any
  user:any;
  constructor(
    private http:Http
  ) { }
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    return this.http.post("http://localhost:3000/user/register",user,{headers:headers}).map(res=>res.json()); 
  }
}
