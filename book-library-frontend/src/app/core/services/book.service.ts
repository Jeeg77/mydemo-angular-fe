import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private url = '/api/books';

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }
  getById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.url}/${encodeURIComponent(id)}`);
  }
  getByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}/author/${encodeURIComponent(author)}`);
  }
  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.url, book);
  }
  update(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.url}/${encodeURIComponent(id)}`, book);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${encodeURIComponent(id)}`);
  }
}
