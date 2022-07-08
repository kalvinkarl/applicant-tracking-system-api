import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { Applicants } from 'src/app/models/admin/applicants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicantsService {
  constructor(private http: HttpClient) { }
  findAll(): Observable<Applicants> {
    return this.http.get(`${apiUrl}/admin/applicants`, httpOptions);
  }
  findGeneral(): Observable<Applicants> {
    return this.http.get(`${apiUrl}/admin/applicants/General`, httpOptions);
  }
}
