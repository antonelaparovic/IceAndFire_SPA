import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { CharacterDetails } from '../../models/character';
import * as Actions from '../../state/characters/characters.actions';
import * as Selectors from '../../state/characters/characters.selectors';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  characterId = '';

  character$!: Observable<CharacterDetails | undefined>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(Selectors.selectCharacterDetailsLoading);
    this.error$ = this.store.select(Selectors.selectCharacterDetailsError);

    this.route.paramMap
      .pipe(
        map(p => p.get('id') || ''),
        takeUntil(this.destroy$)
      )
      .subscribe(id => {
        this.characterId = id;

        this.character$ = this.store.select(Selectors.selectCharacterDetailsById(id));

        this.store.dispatch(Actions.loadCharacterDetails({ id }));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
