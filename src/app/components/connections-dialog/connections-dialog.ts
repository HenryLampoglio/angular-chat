import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ConnectionItem, PaginationResponse } from '../../models/connection.models';
import { ConnectionService } from '../../services/connection.service';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-connections-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './connections-dialog.html',
  styleUrl: './connections-dialog.css',
})
export class ConnectionsDialog implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  private currentSubscription: Subscription | null = null;

  pageState = {
    items: [] as ConnectionItem[],
    page: 0,
    loading: false,
    hasMore: true,
    error: '',
  };

  private connectionService = inject(ConnectionService);

  ngOnInit() {
    this.loadData();
  }

  // Lógica das Tabs: 'circle' ou 'requests'
  activeTab: 'circle' | 'received' | 'sent' = 'circle';

  changeTab(tab: 'circle' | 'received' | 'sent') {
    if (this.activeTab === tab) return;

    this.activeTab = tab;
    this.resentAndLoad();
  }

  onScroll(event: any) {
    const element = event.target as HTMLElement;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 50) {
      this.loadData();
    }
  }

  resentAndLoad() {
    this.pageState.items = [];
    this.pageState.page = 0;
    this.pageState.hasMore = true;
    this.pageState.loading = false;
    this.loadData();
  }

  loadData() {
    if (this.pageState.loading || !this.pageState.hasMore) return;

    this.pageState.loading = true;
    this.pageState.error = '';

    if (this.currentSubscription) this.currentSubscription.unsubscribe();

    switch (this.activeTab) {
      case 'circle':
        this.getUserConnections(this.pageState.page);
        break;
      case 'received':
        this.getInvitesReceived(this.pageState.page);
        break;
      case 'sent':
        this.getInvitesSent(this.pageState.page);
        break;
    }
  }

  getUserConnections(page: number) {
    this.connectionService.getUserConnections(page).subscribe({
      next: (response: PaginationResponse<ConnectionItem>) => {
        this.pageState.items = [...this.pageState.items, ...response.items];
        this.pageState.page = response.page;
        this.pageState.hasMore = this.pageState.page < response.totalPages - 1;
        this.pageState.page++;
        this.pageState.loading = false;
      },
      error: (error: any) => {
        console.error('Erro ao buscar amigos:', error);

        this.pageState.error = 'Erro ao buscar convites enviados';
        this.pageState.loading = false;
      },
    });
  }

  getInvitesReceived(page: number) {
    this.connectionService.getInvitesReceived(page).subscribe({
      next: (response: PaginationResponse<ConnectionItem>) => {
        this.pageState.items = [...this.pageState.items, ...response.items];
        this.pageState.page = response.page;
        this.pageState.hasMore = this.pageState.page < response.totalPages - 1;
        this.pageState.page++;
        this.pageState.loading = false;
      },
      error: (error: any) => {
        console.error('Erro ao buscar convites enviados:', error);

        this.pageState.error = 'Erro ao buscar convites recebidos';
        this.pageState.loading = false;
      },
    });
  }

  getInvitesSent(page: number) {
    this.connectionService.getInvitesSent(page).subscribe({
      next: (response: PaginationResponse<ConnectionItem>) => {
        this.pageState.items = [...this.pageState.items, ...response.items];
        this.pageState.page = response.page;
        this.pageState.hasMore = this.pageState.page < response.totalPages - 1;
        this.pageState.page++;
        this.pageState.loading = false;
      },
      error: (error: any) => {
        console.error('Erro ao buscar convites enviados:', error);

        this.pageState.error = 'Erro ao buscar convites enviados';
        this.pageState.loading = false;
      },
    });
  }

  closeDialog() {
    this.onClose.emit();
  }

  ngOnDestroy() {
    if (this.currentSubscription) this.currentSubscription.unsubscribe();
  }
}
