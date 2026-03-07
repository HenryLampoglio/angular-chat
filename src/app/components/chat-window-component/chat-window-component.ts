import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { MessageInput } from '../message-input/message-input';
import { SocketService, ChatMessageResponseDTO } from '../../services/socket.service';
import { AuthService } from '../../services/auth/Auth.service';
import { ChatStateService } from '../../services/chat-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-window-component',
  imports: [CommonModule, MessageInput],
  templateUrl: './chat-window-component.html',
  styleUrl: './chat-window-component.css',
})
export class ChatWindowComponent implements OnInit {
  private socketService = inject(SocketService);
  private authService = inject(AuthService);
  private chatStateService = inject(ChatStateService);

  meuUsuarioId = this.authService.getUserIdFromToken();
  messages = signal<{ texto: string; souEu: boolean; nickname?: string; hora?: string }[]>([]);

  chatIdAtual: string | null = null;
  nomeDoContato = this.chatStateService.chatNomeAtivo;

  constructor() {
    effect(() => {
      const novoChatId = this.chatStateService.chatIdAtivo();

      if (novoChatId) {
        this.chatIdAtual = novoChatId;

        // Limpa a tela antes de carregar o novo chat
        this.messages.set([]);

        // Avisa o SocketService para conectar na sala certa
        this.socketService.joinChat(novoChatId);
      }
    });
  }

  ngOnInit() {
    this.socketService.message$.subscribe((listaDoServidor: ChatMessageResponseDTO[]) => {
      const mensagensFormatadas = listaDoServidor.map((msg) => ({
        // Usa o message, se não tiver tenta o content, se não tiver manda uma string vazia
        texto: msg.message || msg.content || '',
        souEu: msg.senderId === this.meuUsuarioId,
        nickname: msg.senderNickname,
        hora: msg.createdAt,
      }));

      this.messages.set(mensagensFormatadas);
    });
  }

  receberDoFilho(textoDigitado: string) {
    if (this.chatIdAtual) {
      this.socketService.sendMessage(this.chatIdAtual, textoDigitado);
    }
  }
}
