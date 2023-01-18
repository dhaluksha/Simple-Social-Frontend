import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthData } from '../models/auth-data.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
BASEURL = 'http://localhost:5000/api/chatapp';

  constructor(private http: HttpClient) { }

  // registerUser(body): Observable<any>{               //  wrong pattern
  //   return this.http.post(this.BASEURL + "/register", body);
  // }
  registerUser(data: AuthData){
    return this.http.post<any>(this.BASEURL + "/register", data);
  }
  loginUser(data: AuthData){
    return this.http.post<any>(this.BASEURL + "/login", data);
  }
}
