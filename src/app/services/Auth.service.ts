import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegisterInterface } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/auth/login', { email, password });
  }

  register(userData: UserRegisterInterface): Observable<any> {
    return this.http.post('http://localhost:8080/auth/register', userData);
  }
}
