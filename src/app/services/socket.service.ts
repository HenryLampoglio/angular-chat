import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/Auth.service';

export interface ChatMessageResponseDTO {
  chatId: string;
  senderId: string;
  senderNickname: string;
  message: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private client: Client;

  private messageSubject = new BehaviorSubject<ChatMessageResponseDTO[]>([]);
  public message$ = this.messageSubject.asObservable();

  private currentSubscription: any = null;

  constructor(private authService: AuthService) {
    const token = this.authService.getToken();

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

    this.client.onConnect = () => {
      console.log('Conectado ao servidor WebSocket!');
    };

    this.client.activate();
  }

  joinChat(chatId: string) {
    if (!this.client || !this.client.connected) {
      console.warn('Aguardando conexão com o socket...');
      return;
    }

    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }

    this.messageSubject.next([]);

    const topicUrl = `/topic/messages/${chatId}`;

    this.currentSubscription = this.client.subscribe(topicUrl, (message: Message) => {
      const payload: ChatMessageResponseDTO = JSON.parse(message.body);
      this.updateList(payload);
    });
  }

  sendMessage(chatId: string, messageContent: string) {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: `/chat/${chatId}/send`,
        body: JSON.stringify({ content: messageContent }),
      });
    }
  }

  // 7. Atualiza a lista com o novo objeto
  private updateList(newMessage: ChatMessageResponseDTO) {
    const actualList = this.messageSubject.getValue();
    this.messageSubject.next([...actualList, newMessage]);
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }
}
