import { inject, Injectable } from '@angular/core';
import { LoginResponse, userData } from '../interfaces/login.interface';
import { LocalStorageToken } from '../tokens/local-storage';

@Injectable({
  providedIn: 'root',
})
export class UserAuthStorage {
  private readonly key: string = 'authToken';
  private readonly userData: string = 'userData';

  localStorageToken = inject(LocalStorageToken);

  set(token: string, userData: userData) {
    this.localStorageToken.setItem(this.key, token);
    this.localStorageToken.setItem(this.userData, JSON.stringify(userData));
  }
}
