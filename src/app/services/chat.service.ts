import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IChat } from '../models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  getChatId(targetUserId: string): Observable<IChat> {
    return this.http.get<IChat>(`chats/${targetUserId}`, {});
  }
}
