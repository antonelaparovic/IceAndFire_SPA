import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';

import { CharacterDetails } from '../../models/character';

import * as CharactersActions from '../../state/characters/characters.actions';
import * as CharactersSelectors from '../../state/characters/characters.selectors';

import * as BooksActions from '../../state/books/books.actions';
import * as BooksSelectors from '../../state/books/books.selectors';

import * as HousesActions from '../../state/houses/houses.actions';
import * as HousesSelectors from '../../state/houses/houses.selectors';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  characterId = '';

  character$!: Observable<CharacterDetails | undefined>;
  characterForView$!: Observable<any>;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  // load more
  booksVisibleCountValue = 5;
  private readonly booksStep = 5;
  private readonly booksVisibleCount$ = new BehaviorSubject<number>(this.booksVisibleCountValue);

  povBooksVisibleCountValue = 5;
  private readonly povBooksStep = 5;
  private readonly povBooksVisibleCount$ = new BehaviorSubject<number>(this.povBooksVisibleCountValue);

  allegiancesVisibleCountValue = 5;
  private readonly allegiancesStep = 5;
  private readonly allegiancesVisibleCount$ = new BehaviorSubject<number>(this.allegiancesVisibleCountValue);

  // ids from character
  bookIds$!: Observable<string[]>;
  povBookIds$!: Observable<string[]>;
  houseIds$!: Observable<string[]>;
  spouseId$!: Observable<string | null>;

  // view models
  visibleBooksVm$!: Observable<{ id: string; name: string }[]>;
  visiblePovBooksVm$!: Observable<{ id: string; name: string }[]>;

  visibleHouseIds$!: Observable<string[]>;
  visibleHousesVm$!: Observable<{ id: string; name: string }[]>;

  spouseVm$!: Observable<{ id: string; name: string } | null>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(BooksActions.loadBooks());

    this.loading$ = this.store.select(CharactersSelectors.selectCharacterDetailsLoading);
    this.error$ = this.store.select(CharactersSelectors.selectCharacterDetailsError);

    this.route.paramMap
      .pipe(
        map(p => p.get('id') || ''),
        takeUntil(this.destroy$)
      )
      .subscribe(id => {
        this.characterId = id;

        this.character$ = this.store.select(CharactersSelectors.selectCharacterDetailsById(id));
        this.store.dispatch(CharactersActions.loadCharacterDetails({ id }));

        // hide raw URL fields from key-value
        this.characterForView$ = this.character$.pipe(
          map(c => {
            if (!c) return c;
            const { books, povBooks, allegiances, spouse, ...rest } = c as any;
            return rest;
          })
        );

        this.setupCustomFields();
      });
  }

  loadMoreBooks(): void {
    this.booksVisibleCountValue += this.booksStep;
    this.booksVisibleCount$.next(this.booksVisibleCountValue);
  }

  loadMorePovBooks(): void {
    this.povBooksVisibleCountValue += this.povBooksStep;
    this.povBooksVisibleCount$.next(this.povBooksVisibleCountValue);
  }

  loadMoreAllegiances(): void {
    this.allegiancesVisibleCountValue += this.allegiancesStep;
    this.allegiancesVisibleCount$.next(this.allegiancesVisibleCountValue);
  }

  private setupCustomFields(): void {
    const booksMap$ = this.store.select(BooksSelectors.selectBooksList).pipe(
      map(list => {
        const m: Record<string, string> = {};
        (list ?? []).forEach(b => (m[String(b.id)] = b.name || `Book #${b.id}`));
        return m;
      }),
      shareReplay(1)
    );

    this.bookIds$ = this.character$.pipe(
      map(c => this.toIds(c?.books, /\/api\/books\/(\d+)$/)),
      shareReplay(1)
    );

    this.povBookIds$ = this.character$.pipe(
      map(c => this.toIds(c?.povBooks, /\/api\/books\/(\d+)$/)),
      shareReplay(1)
    );

    this.houseIds$ = this.character$.pipe(
      map(c => this.toIds(c?.allegiances, /\/api\/houses\/(\d+)$/)),
      shareReplay(1)
    );

    this.spouseId$ = this.character$.pipe(
      map(c => this.toSingleId(c?.spouse, /\/api\/characters\/(\d+)$/)),
      shareReplay(1)
    );

    // books VMs with names
    this.visibleBooksVm$ = combineLatest([this.bookIds$, this.booksVisibleCount$, booksMap$]).pipe(
      map(([ids, count, mapObj]) =>
        ids.slice(0, count).map(id => ({ id, name: mapObj[id] ?? 'Loading…' }))
      )
    );

    this.visiblePovBooksVm$ = combineLatest([this.povBookIds$, this.povBooksVisibleCount$, booksMap$]).pipe(
      map(([ids, count, mapObj]) =>
        ids.slice(0, count).map(id => ({ id, name: mapObj[id] ?? 'Loading…' }))
      )
    );

    this.visibleHouseIds$ = combineLatest([this.houseIds$, this.allegiancesVisibleCount$]).pipe(
      map(([ids, count]) => ids.slice(0, count)),
      shareReplay(1)
    );

    this.visibleHousesVm$ = this.visibleHouseIds$.pipe(
      tap(ids => ids.forEach(id => this.store.dispatch(HousesActions.loadHouseDetails({ id })))),
      switchMap(ids => {
        if (ids.length === 0) return of([]);

        return combineLatest(
          ids.map(id =>
            this.store.select(HousesSelectors.selectHouseDetailsById(id)).pipe(
              map(h => ({
                id,
                name: h?.name?.trim() ? h.name : 'Loading…',
              }))
            )
          )
        );
      })
    );

    this.spouseVm$ = this.spouseId$.pipe(
      tap(id => {
        if (id) this.store.dispatch(CharactersActions.loadCharacterDetails({ id }));
      }),
      switchMap(id => {
        if (!id) return of(null);

        return this.store.select(CharactersSelectors.selectCharacterDetailsById(id)).pipe(
          map(ch => ({
            id,
            name: ch?.name?.trim() ? ch.name : 'Loading…',
          }))
        );
      })
    );
  }

  private toIds(urls: any, re: RegExp): string[] {
    if (!Array.isArray(urls)) return [];
    return urls
      .map(u => (typeof u === 'string' ? new RegExp(re).exec(u)?.[1] : null))
      .filter((x): x is string => !!x);
  }

  private toSingleId(url: any, re: RegExp): string | null {
    if (!url || typeof url !== 'string') return null;
    return new RegExp(re).exec(url)?.[1] ?? null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
