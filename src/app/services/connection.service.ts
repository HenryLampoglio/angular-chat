import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionItem, PaginationResponse } from '../models/connection.models';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  constructor(private http: HttpClient) {}

  getInvitesSent(page: number = 0): Observable<PaginationResponse<ConnectionItem>> {
    const params = new HttpParams().set('page', page.toString()).set('size', '10');

    return this.http.get<PaginationResponse<ConnectionItem>>('connections/invites-sent', {
      params,
    });
  }

  sendInvite(receiverId: string): Observable<any> {
    return this.http.post(`connections/send-invite/${receiverId}`, {});
  }
}
