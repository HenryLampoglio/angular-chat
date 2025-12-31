import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connections-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connections-dialog.html',
  styleUrl: './connections-dialog.css',
})
export class ConnectionsDialog {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  // Lógica das Tabs: 'circle' ou 'requests'
  activeTab: 'circle' | 'requests' = 'circle';

  changeTab(tab: 'circle' | 'requests') {
    this.activeTab = tab;
  }

  closeDialog() {
    this.onClose.emit();
  }
}
