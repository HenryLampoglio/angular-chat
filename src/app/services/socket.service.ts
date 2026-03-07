import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/Auth.service';

export interface ChatMessageResponseDTO {
  chatId: string;
  senderId: string;
  senderNickname: string;
  message?: string; // Coloquei opcional para cobrir caso o backend mande 'message' ou 'content'
  content?: string;
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
  private pendingChatId: string | null = null;

  constructor(private authService: AuthService) {
    const token = this.authService.getToken();

    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws-chat',
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,

      // Alinhado com o .setHeartbeatValue(new long[]{10000, 20000}) do Spring
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 20000,

      debug: (str) => console.log('STOMP: ' + str),
    });

    this.client.onConnect = () => {
      console.log('Conectado ao servidor WebSocket!');

      // Se o usuário clicou em um chat enquanto conectava, inscreve agora
      if (this.pendingChatId) {
        this._subscribeToChat(this.pendingChatId);
        this.pendingChatId = null;
      }
    };

    this.client.activate();
  }

  joinChat(chatId: string) {
    if (this.client && this.client.connected) {
      this._subscribeToChat(chatId);
    } else {
      console.warn('Aguardando conexão... guardando a sala na fila.');
      this.pendingChatId = chatId;
    }
  }

  private _subscribeToChat(chatId: string) {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }

    this.messageSubject.next([]);

    // 1. Inscrição alinhada com o RedisMessageForwarder do Spring
    const topicUrl = `/topic/messages/${chatId}`;

    this.currentSubscription = this.client.subscribe(topicUrl, (message: Message) => {
      const payload: ChatMessageResponseDTO = JSON.parse(message.body);
      this.updateList(payload);
    });

    console.log(`Inscrito na sala: ${topicUrl}`);
  }

  sendMessage(chatId: string, messageContent: string) {
    if (this.client && this.client.connected) {
      this.client.publish({
        // 2. Prefixo /app adicionado, alinhado com o WebSocketConfiguration do Spring
        destination: `/app/chat/${chatId}/send`,

        // Certifique-se de que a propriedade "content" é exatamente a mesma
        // que a sua classe SendMessageRequest (do Java) espera receber!
        body: JSON.stringify({ content: messageContent }),
      });
    } else {
      console.error('Falha: Tentou enviar mensagem sem estar conectado!');
    }
  }

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
