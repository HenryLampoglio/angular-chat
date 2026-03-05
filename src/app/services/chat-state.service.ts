import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {
  chatIdAtivo = signal<string | null>(null);

  abrirChat(chatId: string) {
    this.chatIdAtivo.set(chatId);
  }
}