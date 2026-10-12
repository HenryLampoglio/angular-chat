import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService, ThemeMode } from '../../services/theme.service';
import { AuthService } from '../../services/auth/Auth.service';

@Component({
  selector: 'app-settings-overlay',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './settings-overlay.html',
  styleUrl: './settings-overlay.css',
})
export class SettingsOverlay {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();

  readonly themeService = inject(ThemeService);
  readonly authService = inject(AuthService);

  // Estados internos
  activeSection: 'profile' | 'privacy' | 'appearance' = 'appearance';
  notifications: boolean = true;
  readReceipts: boolean = true;
  fontSize: number = 16;

  setSection(section: 'profile' | 'privacy' | 'appearance') {
    this.activeSection = section;
  }

  setTheme(mode: ThemeMode) {
    this.themeService.setTheme(mode);
  }

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }

  handleClose() {
    this.onClose.emit();
  }

  handleLogout() {
    this.onLogout.emit();
  }
}
