import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import { User } from './user-dashboard/user-dashboard.component';
import { Observable } from 'rxjs';
import { user } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string= "http://localhost:3000"; 
  constructor(private http: HttpClient) { }
  getUsers(): Observable<user[]> {
    console.log("get api");
    return this.http.get<user[]>(this.baseUrl+'/users');
  }
  deleteUser(id: number): Observable<user[]> {
    return this.http.delete<user[]>(this.baseUrl+'/users/'+id);
  }
  getUserById(id: number): Observable<user[]> {
    return this.http.get<user[]>(this.baseUrl+'/users/'+id);
  }
  createUser(User: user): Observable<user[]> {
    return this.http.post<user[]>(this.baseUrl+'/users', User);
  }
  updateUser(User: user): Observable<user[]> {
    return this.http.put<user[]>(this.baseUrl+'/users/'+User.user_id, User);
  }
}
