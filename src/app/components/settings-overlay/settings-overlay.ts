import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para o input range (ngModel)

@Component({
  selector: 'app-settings-overlay',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-overlay.html',
  styleUrl: './settings-overlay.css',
})
export class SettingsOverlay {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();

  // Estados internos
  activeSection: 'profile' | 'privacy' | 'appearance' = 'profile';
  notifications: boolean = true;
  readReceipts: boolean = true;
  darkMode: boolean = false;
  fontSize: number = 16;

  setSection(section: 'profile' | 'privacy' | 'appearance') {
    this.activeSection = section;
  }

  handleClose() {
    this.onClose.emit();
  }

  handleLogout() {
    this.onLogout.emit();
  }
}
