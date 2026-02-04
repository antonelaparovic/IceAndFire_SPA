import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CharacterListItem } from '../../models/character';
import * as Actions from '../../state/characters/characters.actions';
import * as Selectors from '../../state/characters/characters.selectors';
import * as FavActions from '../../state/favourites/favourites.actions';
import * as FavSelectors from '../../state/favourites/favourites.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  characters$: Observable<CharacterListItem[]> = this.store.select(Selectors.selectCharactersList);
  loading$: Observable<boolean> = this.store.select(Selectors.selectCharactersListLoading);

  page$: Observable<number> = this.store.select(Selectors.selectCharactersPage);
  pageSize$: Observable<number> = this.store.select(Selectors.selectCharactersPageSize);

  page = 1;
  pageSize = 20;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(Actions.loadCharacters({ page: this.page, pageSize: this.pageSize }));
  }

  nextPage(): void {
    this.page++;
    this.store.dispatch(Actions.loadCharacters({ page: this.page, pageSize: this.pageSize }));
  }

  prevPage(): void {
    if (this.page === 1) return;
    this.page--;
    this.store.dispatch(Actions.loadCharacters({ page: this.page, pageSize: this.pageSize }));
  }
  isFav$(id: string) {
    return this.store.select(FavSelectors.selectIsFavouriteCharacter(id));
  }

  toggleFav(id: string): void {
    this.isFav$(id).pipe(take(1)).subscribe(isFav => {
      this.store.dispatch(
        isFav
          ? FavActions.removeFavouriteCharacter({ id })
          : FavActions.addFavouriteCharacter({ id })
      );
    });
  }

}
