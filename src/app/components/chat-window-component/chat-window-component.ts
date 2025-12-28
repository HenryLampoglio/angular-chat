import { Component } from '@angular/core';
import { MessageInput } from '../message-input/message-input';

@Component({
  selector: 'app-chat-window-component',
  imports: [MessageInput],
  templateUrl: './chat-window-component.html',
  styleUrl: './chat-window-component.css',
})
export class ChatWindowComponent {}
