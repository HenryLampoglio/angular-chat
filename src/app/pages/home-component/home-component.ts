import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChatSidebarComponent } from '../../components/chat-sidebar-component/chat-sidebar-component';
import { ChatWindowComponent } from '../../components/chat-window-component/chat-window-component';

@Component({
  selector: 'app-home-component',
  imports: [MatIconModule, ChatSidebarComponent, ChatWindowComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  currentChat: boolean = false;

  constructor() {
    this.currentChat = false;
  }
}
