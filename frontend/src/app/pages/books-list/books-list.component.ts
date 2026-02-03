import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BookListItem } from '../../models/book';
import * as Actions from '../../state/books/books.actions';
import * as Selectors from '../../state/books/books.selectors';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books$: Observable<BookListItem[]> = this.store.select(Selectors.selectBooksList);
  loading$: Observable<boolean> = this.store.select(Selectors.selectBooksListLoading);
  error$: Observable<string | null> = this.store.select(Selectors.selectBooksListError);

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(Actions.loadBooks());
  }
}
