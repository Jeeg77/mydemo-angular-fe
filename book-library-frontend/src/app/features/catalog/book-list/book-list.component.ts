import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private api = inject(BookService);
  books: Book[] = [];
  columns = ['id', 'title', 'author', 'year', 'actions'];
  mode: 'id' | 'author' = 'author';
  query = '';
  error = '';
  notice = '';
  formOpen = false;
  editId: string | null = null;
  form: Book = this.blank();

  ngOnInit() {
    this.loadAll();
  }
  loadAll() {
    this.error = '';
    this.api.getAll().subscribe({
      next: (x) => {
        this.books = x;
        this.cdr.markForCheck();
      },
      error: (e) => {
        this.fail(e);
        this.cdr.markForCheck();
      },
    });
  }
  search() {
    const q = this.query.trim();

    if (!q) {
      this.loadAll();
      return;
    }

    this.error = '';

    const call =
      this.mode === 'id'
        ? this.api.getById(q).pipe(map((book) => [book]))
        : this.api.getByAuthor(q);

    call.subscribe({
      next: (r) => {
        this.books = r;
        this.cdr.markForCheck();
      },
      error: (e) => {
        this.fail(e);
        this.cdr.markForCheck();
      },
    });
  }
  add() {
    this.editId = null;
    this.form = this.blank();
    this.formOpen = true;
  }
  edit(b: Book) {
    this.editId = b.id ?? null;
    this.form = { title: b.title, author: b.author, year: b.year };
    this.formOpen = true;
  }
  save() {
    const data = {
      title: this.form.title.trim(),
      author: this.form.author.trim(),
      year: Number(this.form.year),
    };
    if (!data.title || !data.author || !Number.isFinite(data.year)) {
      this.error = 'Compila tutti i campi.';
      return;
    }
    const req = this.editId ? this.api.update(this.editId, data) : this.api.create(data);
    req.subscribe({
      next: () => {
        this.formOpen = false;
        this.notice = 'Operazione completata.';
        this.loadAll();
      },
      error: (e) => this.fail(e),
    });
  }
  remove(b: Book) {
    if (!b.id || !confirm(`Eliminare "${b.title}"?`)) return;
    this.api.delete(b.id).subscribe({
      next: () => {
        this.notice = 'Libro eliminato.';
        this.loadAll();
      },
      error: (e) => this.fail(e),
    });
  }
  private blank(): Book {
    return { title: '', author: '', year: new Date().getFullYear() };
  }
  private fail(e: unknown) {
    this.error = 'Chiamata non riuscita: verifica Spring Boot e il contratto JSON.';
    console.error(e);
  }
}
