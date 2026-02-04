import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BookListItem } from '../../models/book';
import * as Actions from '../../state/books/books.actions';
import * as Selectors from '../../state/books/books.selectors';
import * as FavActions from '../../state/favourites/favourites.actions';
import * as FavSelectors from '../../state/favourites/favourites.selectors';
import { take } from 'rxjs/operators';

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
  isFav$(id: string) {
    return this.store.select(FavSelectors.selectIsFavouriteBook(id));
  }

  toggleFav(id: string): void {
    this.isFav$(id).pipe(take(1)).subscribe(isFav => {
      this.store.dispatch(
        isFav
          ? FavActions.removeFavouriteBook({ id })
          : FavActions.addFavouriteBook({ id })
      );
    });
  }
}
