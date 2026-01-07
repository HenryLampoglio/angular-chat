import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { UserRegisterInterface } from '../../interfaces/register.interface';
import { LoginResponse, userData } from '../../interfaces/login.interface';
import path from 'path';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private _currentUser = signal<userData | null>(null);

  public currentUser = this._currentUser.asReadonly();

  public isLoggedIn = computed(() => !!this._currentUser());

  constructor() {
    this.recoverSession();
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<LoginResponse>('http://localhost:8080/auth/login', credentials).pipe(
      tap((response) => {
        this.cookieService.set('auth-token', response.token, { path: '/', secure: true });

        localStorage.setItem('user-data', JSON.stringify(response.user));

        this._currentUser.set(response.user);
      })
    );
  }

  logout() {
    this.cookieService.delete('auth-token', '/');
    localStorage.removeItem('user-data');
    this._currentUser.set(null);
  }

  private recoverSession() {
    const dadosSalvos = localStorage.getItem('user-data');
    const token = this.cookieService.get('auth-token');

    if (dadosSalvos && token) {
      this._currentUser.set(JSON.parse(dadosSalvos));
    } else {
      this.logout();
    }
  }

  register(userData: UserRegisterInterface): Observable<any> {
    return this.http.post('http://localhost:8080/auth/register', userData);
  }
}
