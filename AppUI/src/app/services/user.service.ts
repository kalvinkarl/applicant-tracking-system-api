import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  //To omit only 1 field
  //Omit<User,"Username">
  signup(data: any): Observable<User> {
    return this.http.post<User>(`${apiUrl}/users/signup`, data);
  }
  signin(user: User): Observable<any> {
    return this.http.post<User>(`${apiUrl}/users/signin`,user)
  }
  verify(hashEmail: any, uniqueString: any ): Observable<any> {
    return this.http.get<User[]>(`${apiUrl}/users/verify/${hashEmail}/${uniqueString}`)
  }

  // findByUsername(Username: any): Observable<User> {
  //   return this.http.get(`${this.baseUrl}/${Username}`);
  // }
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
