import { Component, inject, signal } from '@angular/core';
import { MessageInput } from '../message-input/message-input';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-window-component',
  imports: [CommonModule, MessageInput],
  templateUrl: './chat-window-component.html',
  styleUrl: './chat-window-component.css',
})
export class ChatWindowComponent {
  private socketService = inject(SocketService);

  messages = signal<{ texto: string; souEu: boolean }[]>([]);

  ngOnInit() {
    this.socketService.message$.subscribe((resposta: any) => {
      const texto = Array.isArray(resposta) ? resposta[resposta.length - 1] : resposta;

      if (texto) {
        this.messages.update((lista) => [...lista, { texto: texto, souEu: false }]);
      }
    });
  }

  receberDoFilho(textoDigitado: string) {
    this.messages.update((lista) => [...lista, { texto: textoDigitado, souEu: true }]);
    this.socketService.sendMessage(textoDigitado);
  }
}
