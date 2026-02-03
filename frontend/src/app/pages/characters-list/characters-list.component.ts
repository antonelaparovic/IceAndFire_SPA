import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CharacterListItem } from '../../models/character';
import * as Actions from '../../state/characters/characters.actions';
import * as Selectors from '../../state/characters/characters.selectors';

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
}
