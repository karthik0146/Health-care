import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl="http://localhost:3000/api/auth"

  constructor(public http: HttpClient) { }

   login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {username, password });
  }
}
