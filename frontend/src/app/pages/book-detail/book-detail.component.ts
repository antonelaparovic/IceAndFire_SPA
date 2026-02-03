import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { BookDetails } from '../../models/book';
import * as Actions from '../../state/books/books.actions';
import * as Selectors from '../../state/books/books.selectors';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  bookId = '';

  book$!: Observable<BookDetails | undefined>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(Selectors.selectBookDetailsLoading);
    this.error$ = this.store.select(Selectors.selectBookDetailsError);

    this.route.paramMap
      .pipe(
        map(p => p.get('id') || ''),
        takeUntil(this.destroy$)
      )
      .subscribe(id => {
        this.bookId = id;

        this.book$ = this.store.select(Selectors.selectBookDetailsById(id));
        this.store.dispatch(Actions.loadBookDetails({ id }));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
