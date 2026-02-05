import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  private readonly API_URL = 'http://localhost:8080/connections/send-invite/';

  constructor(private http: HttpClient) {}

  sendInvite(receiverId: string): Observable<any> {
    return this.http.post(`${this.API_URL}${receiverId}`, {});
  }
}
