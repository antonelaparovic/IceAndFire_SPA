import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, debounceTime, map, of, switchMap, withLatestFrom } from 'rxjs';

import * as FavActions from './favourites.actions';
import * as FavSelectors from './favourites.selectors';
import { FavouritesApiService } from '../../services/favourites-api.service';

@Injectable()
export class FavouritesEffects {
    loadFromApi$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FavActions.loadFavouritesFromApi),
            switchMap(() =>
                this.api.getMine().pipe(
                    map(favourites => FavActions.loadFavouritesFromApiSuccess({ favourites })),
                    catchError(err =>
                        of(
                            FavActions.loadFavouritesFromApiFailure({
                                error: err?.error?.message ?? 'Failed to load favourites',
                            })
                        )
                    )
                )
            )
        )
    );

    // persist on every change, but debounce to avoid spamming the API on fast changes
    persistToApi$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                FavActions.addFavouriteCharacter,
                FavActions.removeFavouriteCharacter,
                FavActions.addFavouriteBook,
                FavActions.removeFavouriteBook,
                FavActions.addFavouriteHouse,
                FavActions.removeFavouriteHouse,
                FavActions.persistFavouritesToApi
            ),
            debounceTime(250),
            withLatestFrom(
                this.store.select(FavSelectors.selectFavouriteCharacterIds),
                this.store.select(FavSelectors.selectFavouriteBookIds),
                this.store.select(FavSelectors.selectFavouriteHouseIds)
            ),
            switchMap(([_, characters, books, houses]) =>
                this.api
                    .saveMine({
                        characters,
                        books,
                        houses,
                    })
                    .pipe(
                        map(() => ({ type: '[Favourites] Persist Success (noop)' })),
                        catchError(() => of({ type: '[Favourites] Persist Failed (noop)' }))
                    )
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly api: FavouritesApiService,
        private readonly store: Store
    ) { }
}
