import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, Subject, of, throwError } from 'rxjs';

import { FavouritesEffects } from './favourites.effects';
import * as FavActions from './favourites.actions';
import * as FavSelectors from './favourites.selectors';
import { FavouritesApiService } from '../../services/favourites-api.service';

describe('FavouritesEffects', () => {
    let actions$: Observable<any>;
    let actionsSubject: Subject<any>;
    let effects: FavouritesEffects;
    let api: jasmine.SpyObj<FavouritesApiService>;
    let store: MockStore;

    beforeEach(() => {
        actionsSubject = new Subject<any>();
        actions$ = actionsSubject.asObservable();

        api = jasmine.createSpyObj<FavouritesApiService>('FavouritesApiService', ['getMine', 'saveMine']);

        TestBed.configureTestingModule({
            providers: [
                FavouritesEffects,
                provideMockActions(() => actions$),
                provideMockStore(),
                { provide: FavouritesApiService, useValue: api },
            ],
        });

        effects = TestBed.inject(FavouritesEffects);
        store = TestBed.inject(MockStore);

        store.overrideSelector(FavSelectors.selectFavouriteCharacterIds, ['1']);
        store.overrideSelector(FavSelectors.selectFavouriteBookIds, ['10']);
        store.overrideSelector(FavSelectors.selectFavouriteHouseIds, ['20']);
        store.refreshState();
    });

    afterEach(() => {
        actionsSubject.complete();
    });

    describe('loadFromApi$', () => {
        it('should dispatch loadFavouritesFromApiSuccess on success', (done) => {
            const favourites = { characters: ['1'], books: ['10'], houses: ['20'] };
            api.getMine.and.returnValue(of(favourites as any));

            effects.loadFromApi$.subscribe((action) => {
                expect(action).toEqual(
                    FavActions.loadFavouritesFromApiSuccess({ favourites: favourites as any })
                );
                done();
            });

            actionsSubject.next(FavActions.loadFavouritesFromApi());
        });

        it('should dispatch loadFavouritesFromApiFailure on error (message)', (done) => {
            api.getMine.and.returnValue(throwError(() => ({ error: { message: 'Boom' } })));

            effects.loadFromApi$.subscribe((action) => {
                expect(action).toEqual(FavActions.loadFavouritesFromApiFailure({ error: 'Boom' }));
                done();
            });

            actionsSubject.next(FavActions.loadFavouritesFromApi());
        });

        it('should dispatch loadFavouritesFromApiFailure on error (fallback)', (done) => {
            api.getMine.and.returnValue(throwError(() => ({})));

            effects.loadFromApi$.subscribe((action) => {
                expect(action).toEqual(
                    FavActions.loadFavouritesFromApiFailure({ error: 'Failed to load favourites' })
                );
                done();
            });

            actionsSubject.next(FavActions.loadFavouritesFromApi());
        });
    });

    describe('persistToApi$', () => {
        it('should call saveMine after debounce and selectors snapshot', fakeAsync(() => {
            api.saveMine.and.returnValue(of({} as any));

            const sub = effects.persistToApi$.subscribe();

            actionsSubject.next(FavActions.addFavouriteCharacter({ id: '999' }));

            tick(249);
            expect(api.saveMine).not.toHaveBeenCalled();

            tick(1); // 250ms
            expect(api.saveMine).toHaveBeenCalledTimes(1);
            expect(api.saveMine).toHaveBeenCalledWith({
                characters: ['1'],
                books: ['10'],
                houses: ['20'],
            });

            sub.unsubscribe();
        }));

        it('should debounce multiple rapid changes into a single saveMine call', fakeAsync(() => {
            api.saveMine.and.returnValue(of({} as any));

            const sub = effects.persistToApi$.subscribe();

            actionsSubject.next(FavActions.addFavouriteCharacter({ id: '1' }));
            actionsSubject.next(FavActions.removeFavouriteCharacter({ id: '1' }));
            actionsSubject.next(FavActions.addFavouriteBook({ id: '10' }));

            tick(250);
            expect(api.saveMine).toHaveBeenCalledTimes(1);

            sub.unsubscribe();
        }));

        it('should call saveMine when persistFavouritesToApi is dispatched', fakeAsync(() => {
            api.saveMine.and.returnValue(of({} as any));

            const sub = effects.persistToApi$.subscribe();

            actionsSubject.next(FavActions.persistFavouritesToApi());

            tick(250);
            expect(api.saveMine).toHaveBeenCalledTimes(1);
            expect(api.saveMine).toHaveBeenCalledWith({
                characters: ['1'],
                books: ['10'],
                houses: ['20'],
            });

            sub.unsubscribe();
        }));
    });
});
