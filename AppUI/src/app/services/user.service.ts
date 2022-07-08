import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isSignedIn = false;
  constructor(private http: HttpClient) { }
  //To omit only 1 field
  //Omit<User,"Username">
  signup(data: any): Observable<User> {
    return this.http.post<User>(`${apiUrl}/users/signup`, data);
  }
  signin(user: User): Observable<any> {
    return this.http.post<User>(`${apiUrl}/users/signin`,user)
  }
  verify(userId: any, uniqueString: any ): Observable<any> {
    return this.http.get<User[]>(`${apiUrl}/users/verify/${userId}/${uniqueString}`)
  }
  resendVerification(email: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/users/verify`, email)
  }
  //---------------------------------------SECURED--------------------------------------------------------
  findByUsername(Username: any): Observable<User> {
    return this.http.get(`${apiUrl}/users/u/${Username}`, httpOptions);
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
