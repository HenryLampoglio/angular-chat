import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChatSidebarComponent } from '../../components/chat-sidebar-component/chat-sidebar-component';
import { ChatWindowComponent } from '../../components/chat-window-component/chat-window-component';
import { ConnectionsDialog } from '../../components/connections-dialog/connections-dialog';
import { SettingsOverlay } from '../../components/settings-overlay/settings-overlay';
import { UserSearchBar } from '../../components/user-search-bar/user-search-bar';

// Importe o serviço de estado!
import { ChatStateService } from '../../services/chat-state.service';

@Component({
  selector: 'app-home-component',
  imports: [
    MatIconModule,
    ChatSidebarComponent,
    ChatWindowComponent,
    ConnectionsDialog,
    SettingsOverlay,
    UserSearchBar,
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  // 1. Injeta o serviço
  private chatStateService = inject(ChatStateService);

  // 2. Aponta a variável diretamente para o Signal.
  // Agora ela é reativa e sabe quando um ID de chat foi setado!
  currentChat = this.chatStateService.chatIdAtivo;

  isConnectionsModalOpen: boolean = false;
  isSettingModalsOpen: boolean = false;

  // Removi o construtor que setava false, pois o Signal já começa com null por padrão

  openModal() {
    this.isConnectionsModalOpen = true;
  }

  closeModal() {
    this.isConnectionsModalOpen = false;
  }

  openSettings() {
    this.isSettingModalsOpen = true;
  }

  closeSettings() {
    this.isSettingModalsOpen = false;
  }

  handleLogout() {
    console.log('Usuário deslogado!');
    this.isSettingModalsOpen = false;
  }
}
