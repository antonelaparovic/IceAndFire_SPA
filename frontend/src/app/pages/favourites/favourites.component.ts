import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as FavSelectors from '../../state/favourites/favourites.selectors';
import * as FavActions from '../../state/favourites/favourites.actions';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {
  characterIds$: Observable<string[]> = this.store.select(FavSelectors.selectFavouriteCharacterIds);
  bookIds$: Observable<string[]> = this.store.select(FavSelectors.selectFavouriteBookIds);
  houseIds$: Observable<string[]> = this.store.select(FavSelectors.selectFavouriteHouseIds);

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
