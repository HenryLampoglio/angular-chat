import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatStateService {
  chatIdAtivo = signal<string | null>(null);

  chatNomeAtivo = signal<string>('Contato');

  abrirChat(chatId: string, nomeContato: string) {
    this.chatIdAtivo.set(chatId);
    this.chatNomeAtivo.set(nomeContato);
  }
}
