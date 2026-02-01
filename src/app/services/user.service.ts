import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importe HttpParams
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/user/search';

  constructor(private http: HttpClient) {}

  searchUsers(query: string): Observable<User[]> {
    interface SearchResponse {
      usersList: User[];
    }

    // O HttpParams cuida de converter o '#' em '%23' e o ' ' em '%20' automaticamente
    const params = new HttpParams().set('userIdentifier', query);

    return this.http
      .get<SearchResponse>(this.API_URL, { params })
      .pipe(map((response) => response.usersList));
  }
}
