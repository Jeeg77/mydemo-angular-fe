import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from '../../../core/services/chat.service';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book.model';
import { ChatResponse } from '../../../core/models/chat.model';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css',
})
export class ChatPanelComponent {
  private cdr = inject(ChangeDetectorRef);
  private chat = inject(ChatService);
  private booksApi = inject(BookService);
  message = '';
  answer = '';
  error = '';
  notice = '';
  internalBooks: Book[] = [];
  externalBooks: Book[] = [];
  loading = false;
  send() {
    const q = this.message.trim();
    if (!q || this.loading) return;
    this.loading = true;
    this.error = '';
    this.notice = '';
    this.answer = '';
    this.chat.sendMessage(q).subscribe({
      next: (r: ChatResponse) => {
        console.log('RISPOSTA RICEVUTA:', r);

        this.answer = r.response;
        this.internalBooks = r.internalBooks ?? [];
        this.externalBooks = r.externalBooks ?? [];
        this.loading = false;

        this.cdr.markForCheck();
      },
      error: (e) => {
        this.loading = false;
        this.error = 'Errore nella chiamata AI. Verifica Spring Boot e FastAPI.';
        console.error(e);

        this.cdr.markForCheck();
      },
    });
  }
  addExternal(b: Book) {
    this.booksApi.create({ title: b.title, author: b.author, year: b.year }).subscribe({
      next: () => (this.notice = `${b.title} aggiunto al catalogo.`),
      error: (e) => {
        this.error = 'Impossibile aggiungere il libro.';
        console.error(e);
      },
    });
  }
}
