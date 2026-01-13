import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './message-input.html',
  styleUrl: './message-input.css',
})
export class MessageInput {
  textoInput = '';

  // Cria o evento para mandar o texto pro Pai
  @Output() aoEnviar = new EventEmitter<string>();

  enviar() {
    if (this.textoInput.trim()) {
      // Emite o evento com o texto
      this.aoEnviar.emit(this.textoInput);
      // Limpa o campo
      this.textoInput = '';
    }
  }
}
