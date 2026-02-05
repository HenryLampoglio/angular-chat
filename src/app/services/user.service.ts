import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importe HttpParams
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  searchUsers(query: string): Observable<User[]> {
    interface SearchResponse {
      usersList: User[];
    }

    // O HttpParams cuida de converter o '#' em '%23' e o ' ' em '%20' automaticamente
    const params = new HttpParams().set('userIdentifier', query);

    return this.http
      .get<SearchResponse>('user/search', { params })
      .pipe(map((response) => response.usersList));
  }
}
