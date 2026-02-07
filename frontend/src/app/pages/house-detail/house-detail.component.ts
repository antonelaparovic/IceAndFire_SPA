import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';

import { HouseDetails } from '../../models/house';

import * as HousesActions from '../../state/houses/houses.actions';
import * as HousesSelectors from '../../state/houses/houses.selectors';

import * as CharactersActions from '../../state/characters/characters.actions';
import * as CharactersSelectors from '../../state/characters/characters.selectors';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss'],
})
export class HouseDetailComponent implements OnInit, OnDestroy {
  houseId = '';

  house$!: Observable<HouseDetails | undefined>;
  houseForView$!: Observable<any>;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  swornVisibleCountValue = 5;
  private readonly swornStep = 5;
  private readonly swornVisibleCount$ = new BehaviorSubject<number>(this.swornVisibleCountValue);

  // ids extracted from house
  swornIds$!: Observable<string[]>;
  cadetIds$!: Observable<string[]>;

  currentLordId$!: Observable<string | null>;
  heirId$!: Observable<string | null>;
  overlordId$!: Observable<string | null>;

  visibleSwornVm$!: Observable<{ id: string; name: string }[]>;
  cadetVm$!: Observable<{ id: string; name: string }[]>;

  currentLordVm$!: Observable<{ id: string; name: string } | null>;
  heirVm$!: Observable<{ id: string; name: string } | null>;
  overlordVm$!: Observable<{ id: string; name: string } | null>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(HousesSelectors.selectHouseDetailsLoading);
    this.error$ = this.store.select(HousesSelectors.selectHouseDetailsError);

    this.route.paramMap
      .pipe(
        map(p => p.get('id') || ''),
        takeUntil(this.destroy$)
      )
      .subscribe(id => {
        this.houseId = id;

        this.house$ = this.store.select(HousesSelectors.selectHouseDetailsById(id));
        this.store.dispatch(HousesActions.loadHouseDetails({ id }));

        this.houseForView$ = this.house$.pipe(
          map(h => {
            if (!h) return h;
            const { currentLord, heir, overlord, swornMembers, cadetBranches, ...rest } = h as any;
            return rest;
          })
        );

        this.setupCustomFields();
      });
  }

  loadMoreSworn(): void {
    this.swornVisibleCountValue += this.swornStep;
    this.swornVisibleCount$.next(this.swornVisibleCountValue);
  }

  private setupCustomFields(): void {
    this.swornIds$ = this.house$.pipe(
      map(h => this.toIds(h?.swornMembers, /\/api\/characters\/(\d+)$/)),
      shareReplay(1)
    );

    this.cadetIds$ = this.house$.pipe(
      map(h => this.toIds(h?.cadetBranches, /\/api\/houses\/(\d+)$/)),
      shareReplay(1)
    );

    this.currentLordId$ = this.house$.pipe(
      map(h => this.toSingleId(h?.currentLord, /\/api\/characters\/(\d+)$/)),
      shareReplay(1)
    );

    this.heirId$ = this.house$.pipe(
      map(h => this.toSingleId(h?.heir, /\/api\/characters\/(\d+)$/)),
      shareReplay(1)
    );

    this.overlordId$ = this.house$.pipe(
      map(h => this.toSingleId(h?.overlord, /\/api\/houses\/(\d+)$/)),
      shareReplay(1)
    );

    this.visibleSwornVm$ = combineLatest([this.swornIds$, this.swornVisibleCount$]).pipe(
      map(([ids, count]) => ids.slice(0, count)),
      tap(ids => ids.forEach(id => this.store.dispatch(CharactersActions.loadCharacterDetails({ id })))),
      switchMap(ids => {
        if (ids.length === 0) return of([]);
        return combineLatest(
          ids.map(id =>
            this.store.select(CharactersSelectors.selectCharacterDetailsById(id)).pipe(
              map(ch => ({
                id,
                name: ch?.name?.trim() ? ch.name : 'Loading…',
              }))
            )
          )
        );
      })
    );

    this.cadetVm$ = this.cadetIds$.pipe(
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

    this.currentLordVm$ = this.singleCharacterVm$(this.currentLordId$);
    this.heirVm$ = this.singleCharacterVm$(this.heirId$);
    this.overlordVm$ = this.singleHouseVm$(this.overlordId$);
  }

  private singleCharacterVm$(id$: Observable<string | null>): Observable<{ id: string; name: string } | null> {
    return id$.pipe(
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

  private singleHouseVm$(id$: Observable<string | null>): Observable<{ id: string; name: string } | null> {
    return id$.pipe(
      tap(id => {
        if (id) this.store.dispatch(HousesActions.loadHouseDetails({ id }));
      }),
      switchMap(id => {
        if (!id) return of(null);
        return this.store.select(HousesSelectors.selectHouseDetailsById(id)).pipe(
          map(h => ({
            id,
            name: h?.name?.trim() ? h.name : 'Loading…',
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
