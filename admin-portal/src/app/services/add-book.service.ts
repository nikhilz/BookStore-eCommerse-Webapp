import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment';
import { stringify } from 'querystring';

const addBookUrl = environment.api + "book/add";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AddBookService {

  constructor(private http: HttpClient) { }

  sendBook(book: Book) {
    return this.http.post(addBookUrl, JSON.stringify(book), httpOptions);
  }
}
