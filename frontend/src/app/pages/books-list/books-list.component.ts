import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as Actions from '../../state/books/books.actions';
import * as Selectors from '../../state/books/books.selectors';
import * as FavActions from '../../state/favourites/favourites.actions';
import * as FavSelectors from '../../state/favourites/favourites.selectors';
import { debounceTime, distinctUntilChanged, startWith, take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books$ = this.store.select(Selectors.selectFilteredBooksList);
  loading$ = this.store.select(Selectors.selectBooksListLoading);
  error$ = this.store.select(Selectors.selectBooksListError);

  search = new FormControl<string>('', { nonNullable: true });

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(Actions.loadBooks());

    this.search.valueChanges
      .pipe(
        startWith(this.search.value),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.store.dispatch(Actions.setBooksQuery({ query: value }));
      });
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
