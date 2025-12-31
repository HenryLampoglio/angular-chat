import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChatSidebarComponent } from '../../components/chat-sidebar-component/chat-sidebar-component';
import { ChatWindowComponent } from '../../components/chat-window-component/chat-window-component';
import { ConnectionsDialog } from '../../components/connections-dialog/connections-dialog';
import { SettingsOverlay } from '../../components/settings-overlay/settings-overlay';

@Component({
  selector: 'app-home-component',
  imports: [
    MatIconModule,
    ChatSidebarComponent,
    ChatWindowComponent,
    ConnectionsDialog,
    SettingsOverlay,
  ],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  currentChat: boolean = false;
  isConnectionsModalOpen: boolean = false;
  isSettingModalsOpen: boolean = false;

  constructor() {
    this.currentChat = false;
  }

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
    // Aqui você adicionaria a lógica real (limpar token, redirecionar, etc)
    this.isSettingModalsOpen = false;
  }
}
