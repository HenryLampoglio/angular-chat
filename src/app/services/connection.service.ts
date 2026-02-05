import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  constructor(private http: HttpClient) {}

  sendInvite(receiverId: string): Observable<any> {
    return this.http.post(`connections/send-invite/${receiverId}`, {});
  }
}
