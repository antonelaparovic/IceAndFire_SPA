import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as FavSelectors from '../../state/favourites/favourites.selectors';
import * as FavActions from '../../state/favourites/favourites.actions';
import * as CharactersActions from '../../state/characters/characters.actions';
import * as CharactersSelectors from '../../state/characters/characters.selectors';
import * as BooksActions from '../../state/books/books.actions';
import * as BooksSelectors from '../../state/books/books.selectors';
import * as HousesActions from '../../state/houses/houses.actions';
import * as HousesSelectors from '../../state/houses/houses.selectors';

type FavVm = { id: string; name: string };

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {
  characterIds$: Observable<string[]> = this.store.select(FavSelectors.selectFavouriteCharacterIds);
  bookIds$: Observable<string[]> = this.store.select(FavSelectors.selectFavouriteBookIds);
  houseIds$: Observable<string[]> = this.store.select(FavSelectors.selectFavouriteHouseIds);

  favCharactersVm$: Observable<FavVm[]> = this.characterIds$.pipe(
    tap(ids => ids.forEach(id => this.store.dispatch(CharactersActions.loadCharacterDetails({ id })))),
    switchMap(ids => {
      if (!ids.length) return of([]);
      return combineLatest(
        ids.map(id =>
          this.store.select(CharactersSelectors.selectCharacterDetailsById(id)).pipe(
            map(d => ({
              id,
              name: d?.name?.trim() ? d.name : `Character #${id}`,
            }))
          )
        )
      );
    })
  );

  favBooksVm$: Observable<FavVm[]> = this.bookIds$.pipe(
    tap(ids => ids.forEach(id => this.store.dispatch(BooksActions.loadBookDetails({ id })))),
    switchMap(ids => {
      if (!ids.length) return of([]);
      return combineLatest(
        ids.map(id =>
          this.store.select(BooksSelectors.selectBookDetailsById(id)).pipe(
            map(d => ({
              id,
              name: d?.name?.trim() ? d.name : `Book #${id}`,
            }))
          )
        )
      );
    })
  );

  favHousesVm$: Observable<FavVm[]> = this.houseIds$.pipe(
    tap(ids => ids.forEach(id => this.store.dispatch(HousesActions.loadHouseDetails({ id })))),
    switchMap(ids => {
      if (!ids.length) return of([]);
      return combineLatest(
        ids.map(id =>
          this.store.select(HousesSelectors.selectHouseDetailsById(id)).pipe(
            map(d => ({
              id,
              name: d?.name?.trim() ? d.name : `House #${id}`,
            }))
          )
        )
      );
    })
  );

  constructor(private readonly store: Store) { }

  removeCharacter(id: string): void {
    this.store.dispatch(FavActions.removeFavouriteCharacter({ id }));
  }

  removeBook(id: string): void {
    this.store.dispatch(FavActions.removeFavouriteBook({ id }));
  }

  removeHouse(id: string): void {
    this.store.dispatch(FavActions.removeFavouriteHouse({ id }));
  }
}
