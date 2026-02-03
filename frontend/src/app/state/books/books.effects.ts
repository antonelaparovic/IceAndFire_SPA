import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { IceAndFireApiService } from '../../services/ice-and-fire-api.service';
import * as BooksActions from './books.actions';

@Injectable()
export class BooksEffects {
    loadList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActions.loadBooks),
            mergeMap(() =>
                this.api.getBooks().pipe(
                    map(items => BooksActions.loadBooksSuccess({ items })),
                    catchError(() => of(BooksActions.loadBooksFailure({ error: 'Failed to load books' })))
                )
            )
        )
    );

    loadDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActions.loadBookDetails),
            mergeMap(({ id }) =>
                this.api.getBookById(id).pipe(
                    map(item => BooksActions.loadBookDetailsSuccess({ item })),
                    catchError(() => of(BooksActions.loadBooksDetailsFailure({ error: 'Failed to load book details' })))
                )
            )
        )
    );

    constructor(private readonly actions$: Actions, private readonly api: IceAndFireApiService) { }
}