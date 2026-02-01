import { Component, OnInit } from '@angular/core';
import { IceAndFireApiService } from '../../services/ice-and-fire-api.service';
import { BookListItem } from '../../models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books: BookListItem[] = [];
  loading = true;

  constructor(private readonly api: IceAndFireApiService) { }

  ngOnInit(): void {
    this.api.getBooks().subscribe({
      next: (items) => {
        this.books = items;
        this.loading = false;
      },
      error: () => {
        this.books = [];
        this.loading = false;
      },
    });
  }
}
