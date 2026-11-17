import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookListComponent } from './features/catalog/book-list/book-list.component';
import { ChatPanelComponent } from './features/chat/chat-panel/chat-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, BookListComponent, ChatPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  active: 'catalog' | 'chat' = 'catalog';
}
