import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';

import { BookDetails } from '../../models/book';
import * as Actions from '../../state/books/books.actions';
import * as Selectors from '../../state/books/books.selectors';

import * as CharactersActions from '../../state/characters/characters.actions';
import * as CharactersSelectors from '../../state/characters/characters.selectors';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  bookId = '';

  book$!: Observable<BookDetails | undefined>;
  bookForView$!: Observable<any>;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  // characters (load more)
  visibleCountValue = 5;
  private readonly visibleStep = 5;
  private readonly visibleCount$ = new BehaviorSubject<number>(this.visibleCountValue);

  characterIds$!: Observable<string[]>;
  visibleCharactersVm$!: Observable<{ id: string; name: string | null }[]>;

  // pov characters (load more)
  povVisibleCountValue = 5;
  private readonly povVisibleStep = 5;
  private readonly povVisibleCount$ = new BehaviorSubject<number>(this.povVisibleCountValue);

  povCharacterIds$!: Observable<string[]>;
  povVisibleCharactersVm$!: Observable<{ id: string; name: string | null }[]>;

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

        this.bookForView$ = this.book$.pipe(
          map(b => {
            if (!b) return b;
            const { characters, povCharacters, ...rest } = b as any;
            return rest;
          })
        );

        this.setupCharactersStreams();
        this.setupPovCharactersStreams();
      });
  }

  loadMoreCharacters(): void {
    this.visibleCountValue += this.visibleStep;
    this.visibleCount$.next(this.visibleCountValue);
  }

  loadMorePovCharacters(): void {
    this.povVisibleCountValue += this.povVisibleStep;
    this.povVisibleCount$.next(this.povVisibleCountValue);
  }

  private setupCharactersStreams(): void {
    this.characterIds$ = this.book$.pipe(
      map(book => {
        const urls = (book?.characters ?? []) as string[];
        return urls
          .map(u => this.idFromCharacterUrl(u))
          .filter((x): x is string => !!x);
      }),
      shareReplay(1)
    );

    const visibleIds$ = combineLatest([this.characterIds$, this.visibleCount$]).pipe(
      map(([ids, count]) => ids.slice(0, count))
    );

    this.visibleCharactersVm$ = visibleIds$.pipe(
      tap(ids => {
        ids.forEach(charId => {
          this.store.dispatch(CharactersActions.loadCharacterDetails({ id: charId }));
        });
      }),
      switchMap(ids => {
        if (ids.length === 0) return of([]);

        return combineLatest(
          ids.map(charId =>
            this.store.select(CharactersSelectors.selectCharacterDetailsById(charId)).pipe(
              map(ch => ({
                id: charId,
                // name: ch?.name?.trim() ? ch.name : `Character #${charId}`,
                name: ch?.name?.trim() ? ch.name : null,
              }))
            )
          )
        );
      })
    );
  }

  private setupPovCharactersStreams(): void {
    this.povCharacterIds$ = this.book$.pipe(
      map(book => {
        const urls = (book?.povCharacters ?? []) as string[];
        return urls
          .map(u => this.idFromCharacterUrl(u))
          .filter((x): x is string => !!x);
      }),
      shareReplay(1)
    );

    const visibleIds$ = combineLatest([this.povCharacterIds$, this.povVisibleCount$]).pipe(
      map(([ids, count]) => ids.slice(0, count))
    );

    this.povVisibleCharactersVm$ = visibleIds$.pipe(
      tap(ids => {
        ids.forEach(charId => {
          this.store.dispatch(CharactersActions.loadCharacterDetails({ id: charId }));
        });
      }),
      switchMap(ids => {
        if (ids.length === 0) return of([]);

        return combineLatest(
          ids.map(charId =>
            this.store.select(CharactersSelectors.selectCharacterDetailsById(charId)).pipe(
              map(ch => ({
                id: charId,
                // name: ch?.name?.trim() ? ch.name : `Character #${charId}`,
                name: ch?.name?.trim() ? ch.name : null,
              }))
            )
          )
        );
      })
    );
  }

  private idFromCharacterUrl(url: string): string | null {
    const m = new RegExp(/\/api\/characters\/(\d+)$/).exec(url);
    return m ? m[1] : null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
