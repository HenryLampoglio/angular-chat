import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/Auth.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private client: Client;
  private messageSubject = new BehaviorSubject<string[]>([]);
  public message$ = this.messageSubject.asObservable();

  constructor(private AuthService: AuthService) {
    const token = this.AuthService.getToken();
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws-chat',

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      debug: (str) => console.log('socket: ' + str),
    });

    this.client.onConnect = (frame) => {
      this.client.subscribe('/topic/messages', (message: Message) => {
        const payload = JSON.parse(message.body);
        console.log('Java: ', payload);
        this.updateList(payload.content);
      });
    };

    this.client.activate();
  }

  sendMessage(message: string) {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: '/hello',
        body: JSON.stringify({ content: message }),
      });
    }
  }

  private updateList(newMessage: string) {
    const actualList = this.messageSubject.getValue();
    this.messageSubject.next([...actualList, newMessage]);
  }
}
