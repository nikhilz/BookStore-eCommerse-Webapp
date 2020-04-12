import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.api+"auth/";

const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

 login(credentials):Observable<any>{
   return this.http.post(AUTH_API+'signin',{
     username: credentials.username,
     password: credentials.password
   },httpOptions);
 }



   
}
