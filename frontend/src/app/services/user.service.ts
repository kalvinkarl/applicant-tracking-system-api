import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  //To omit only 1 field
  //Omit<User,"Username">
  signup(data: any): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users/signup`, data);
  }
  signin(user: User): Observable<any> {
    return this.http.post<User>(`${environment.apiUrl}/users/signin`,user);
  }
  resendVerification(email: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/verify`, email);
  }
  verify(userId: any, uniqueString: any ): Observable<any> {
    return this.http.get<User[]>(`${environment.apiUrl}/users/verify/${userId}/${uniqueString}`);
  }
  //---------------------------------------SECURED--------------------------------------------------------
  findByUsername(Username: any): Observable<User> {
    return this.http.get(`${environment.apiUrl}/users/u/${Username}`, httpOptions);
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
