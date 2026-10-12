import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ChatSidebarComponent } from '../../components/chat-sidebar-component/chat-sidebar-component';
import { ChatWindowComponent } from '../../components/chat-window-component/chat-window-component';
import { ConnectionsDialog } from '../../components/connections-dialog/connections-dialog';
import { SettingsOverlay } from '../../components/settings-overlay/settings-overlay';
import { UserSearchBar } from '../../components/user-search-bar/user-search-bar';
import { ChatStateService } from '../../services/chat-state.service';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth/Auth.service';

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
  private chatStateService = inject(ChatStateService);
  private router = inject(Router);
  readonly themeService = inject(ThemeService);
  readonly authService = inject(AuthService);

  currentChat = this.chatStateService.chatIdAtivo;

  isConnectionsModalOpen: boolean = false;
  isSettingModalsOpen: boolean = false;

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

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  handleLogout() {
    this.authService.logout();
    this.isSettingModalsOpen = false;
    this.router.navigate(['/login']);
  }
}
