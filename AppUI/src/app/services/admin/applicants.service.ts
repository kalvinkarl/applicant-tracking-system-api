import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { Applicant } from 'src/app/models/admin/applicant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicantsService {
  constructor(private http: HttpClient) { }
  findAll(): Observable<Applicant> {
    return this.http.get(`${apiUrl}/admin/applicants`, httpOptions);
  }
  findGeneral(): Observable<Applicant> {
    return this.http.get(`${apiUrl}/admin/applicants/General`, httpOptions);
  }
}
