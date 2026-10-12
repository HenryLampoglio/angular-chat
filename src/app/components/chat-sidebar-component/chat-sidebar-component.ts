import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChatStateService } from '../../services/chat-state.service';

export interface RecentChat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatarColor: string;
}

@Component({
  selector: 'app-chat-sidebar-component',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './chat-sidebar-component.html',
  styleUrl: './chat-sidebar-component.css',
})
export class ChatSidebarComponent {
  readonly chatState = inject(ChatStateService);

  searchTerm = signal('');

  recentChats = signal<RecentChat[]>([
    {
      id: 'demo-1',
      name: 'Comunidade Chat',
      lastMessage: 'Bem-vindo ao novo chat modernizado!',
      time: 'Agora',
      unread: 2,
      online: true,
      avatarColor: 'from-emerald-400 to-teal-500 dark:from-violet-500 dark:to-indigo-600',
    },
  ]);

  filteredChats = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    if (!query) return this.recentChats();
    return this.recentChats().filter(
      (c) => c.name.toLowerCase().includes(query) || c.lastMessage.toLowerCase().includes(query),
    );
  });

  selectChat(chat: RecentChat) {
    this.chatState.abrirChat(chat.id, chat.name);
  }
}
