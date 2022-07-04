import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  //To omit only 1 field
  //Omit<User,"Username">
  signup(data: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/signup`, data);
  }
  signin(user: User): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/signin`,user)
  }
  findByUsername(Username: any): Observable<User> {
    return this.http.get(`${this.baseUrl}/${Username}`);
  }
  // findByUsername(Username: any): Observable<User[]> {
  //   return this.http.get<User[]>(`${baseUrl}?Username=${Username}`);
  // }
  // getAll(): Observable<User[]> {
  //   return this.http.get<User[]>(baseUrl);
  // }
  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }
  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  // }
  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }
}
