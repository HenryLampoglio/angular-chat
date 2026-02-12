import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionInviteAccept, ConnectionItem, PaginationResponse } from '../models/connection.models';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  constructor(private http: HttpClient) {}

  getInvitesSent(page: number = 0): Observable<PaginationResponse<ConnectionItem>> {
    const params = new HttpParams().set('page', page.toString()).set('size', '10');

    return this.http.get<PaginationResponse<ConnectionItem>>('connections/invites-sent', {
      params,
    });
  }

  getInvitesReceived(page: number = 0): Observable<PaginationResponse<ConnectionItem>> {
    const params = new HttpParams().set('page', page.toString()).set('size', '10');

    return this.http.get<PaginationResponse<ConnectionItem>>('connections/invites-received', {
      params,
    });
  }

  getUserConnections(page: number = 0): Observable<PaginationResponse<ConnectionItem>> {
    const params = new HttpParams().set('page', page.toString()).set('size', '10');

    return this.http.get<PaginationResponse<ConnectionItem>>('connections/friends', { params });
  }

  acceptInvite(connectionId: string): Observable<ConnectionInviteAccept> {
    return this.http.patch<ConnectionInviteAccept>(`connections/accept-invite/${connectionId}`, {});
  }

  cancelConnection(connectionId: string): Observable<any> {
    return this.http.delete(`connections/cancel-connection/${connectionId}`);
  }

  sendInvite(receiverId: string): Observable<any> {
    return this.http.post(`connections/send-invite/${receiverId}`, {});
  }
}
