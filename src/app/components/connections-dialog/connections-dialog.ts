import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-connections-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './connections-dialog.html',
  styleUrl: './connections-dialog.css',
})
export class ConnectionsDialog {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  // Lógica das Tabs: 'circle' ou 'requests'
  activeTab: 'circle' | 'received' | 'sent' = 'circle';

  changeTab(tab: 'circle' | 'received' | 'sent') {
    this.activeTab = tab;
  }

  closeDialog() {
    this.onClose.emit();
  }
}
