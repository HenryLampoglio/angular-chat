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
  private chatStateService = inject(ChatStateService); // Injetou o novo serviço

  meuUsuarioId = this.authService.getUserIdFromToken();
  messages = signal<{ texto: string; souEu: boolean; nickname?: string; hora?: string }[]>([]);

  // Precisamos guardar o ID localmente para a função receberDoFilho poder usar
  chatIdAtual: string | null = null;

  constructor() {
    // O effect SEMPRE roda no construtor. Ele reage a mudanças no Signal.
    effect(() => {
      const novoChatId = this.chatStateService.chatIdAtivo();

      if (novoChatId) {
        this.chatIdAtual = novoChatId;

        // 1. Limpa a tela para não misturar mensagens do chat anterior
        this.messages.set([]);

        // 2. Avisa o SocketService para trocar de sala
        this.socketService.joinChat(novoChatId);
      }
    });
  }

  ngOnInit() {
    // Escuta as mensagens que chegam do WebSocket, igual antes
    this.socketService.message$.subscribe((listaDoServidor: ChatMessageResponseDTO[]) => {
      const mensagensFormatadas = listaDoServidor.map((msg) => ({
        texto: msg.message || msg.message,
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
