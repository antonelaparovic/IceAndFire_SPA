import { favouritesReducer } from './favourites.reducers';
import * as Actions from './favourites.actions';
import { initialFavouritesState } from './favourites.models';

describe('favouritesReducer', () => {
    it('should return the initial state for an unknown action', () => {
        const action = { type: '[Test] Unknown' } as any;

        const state = favouritesReducer(undefined, action);

        expect(state).toEqual(initialFavouritesState);
    });

    describe('Characters', () => {
        it('should add favourite character id', () => {
            const state = favouritesReducer(
                initialFavouritesState,
                Actions.addFavouriteCharacter({ id: '10' })
            );

            expect(state.characterIds).toEqual(['10']);
            expect(state.bookIds).toEqual([]);
            expect(state.houseIds).toEqual([]);
        });

        it('should not add duplicate favourite character id', () => {
            const withOne = favouritesReducer(
                initialFavouritesState,
                Actions.addFavouriteCharacter({ id: '10' })
            );

            const withDuplicate = favouritesReducer(
                withOne,
                Actions.addFavouriteCharacter({ id: '10' })
            );

            expect(withDuplicate.characterIds).toEqual(['10']);
        });

        it('should remove favourite character id', () => {
            const seeded = {
                ...initialFavouritesState,
                characterIds: ['10', '11'],
            };

            const state = favouritesReducer(
                seeded,
                Actions.removeFavouriteCharacter({ id: '10' })
            );

            expect(state.characterIds).toEqual(['11']);
        });
    });

    describe('Books', () => {
        it('should add favourite book id', () => {
            const state = favouritesReducer(
                initialFavouritesState,
                Actions.addFavouriteBook({ id: '2' })
            );

            expect(state.bookIds).toEqual(['2']);
            expect(state.characterIds).toEqual([]);
            expect(state.houseIds).toEqual([]);
        });

        it('should not add duplicate favourite book id', () => {
            const withOne = favouritesReducer(
                initialFavouritesState,
                Actions.addFavouriteBook({ id: '2' })
            );

            const withDuplicate = favouritesReducer(
                withOne,
                Actions.addFavouriteBook({ id: '2' })
            );

            expect(withDuplicate.bookIds).toEqual(['2']);
        });

        it('should remove favourite book id', () => {
            const seeded = {
                ...initialFavouritesState,
                bookIds: ['2', '3'],
            };

            const state = favouritesReducer(seeded, Actions.removeFavouriteBook({ id: '2' }));

            expect(state.bookIds).toEqual(['3']);
        });
    });

    describe('Houses', () => {
        it('should add favourite house id', () => {
            const state = favouritesReducer(
                initialFavouritesState,
                Actions.addFavouriteHouse({ id: '7' })
            );

            expect(state.houseIds).toEqual(['7']);
            expect(state.characterIds).toEqual([]);
            expect(state.bookIds).toEqual([]);
        });

        it('should not add duplicate favourite house id', () => {
            const withOne = favouritesReducer(
                initialFavouritesState,
                Actions.addFavouriteHouse({ id: '7' })
            );

            const withDuplicate = favouritesReducer(
                withOne,
                Actions.addFavouriteHouse({ id: '7' })
            );

            expect(withDuplicate.houseIds).toEqual(['7']);
        });

        it('should remove favourite house id', () => {
            const seeded = {
                ...initialFavouritesState,
                houseIds: ['7', '8'],
            };

            const state = favouritesReducer(seeded, Actions.removeFavouriteHouse({ id: '7' }));

            expect(state.houseIds).toEqual(['8']);
        });
    });

    it('should set favourites from API success', () => {
        const seeded = {
            ...initialFavouritesState,
            characterIds: ['old'],
            bookIds: ['old'],
            houseIds: ['old'],
        };

        const apiFavourites = {
            characters: ['1', '2'],
            books: ['10'],
            houses: ['20', '21'],
        };

        const state = favouritesReducer(
            seeded,
            Actions.loadFavouritesFromApiSuccess({ favourites: apiFavourites as any })
        );

        expect(state.characterIds).toEqual(['1', '2']);
        expect(state.bookIds).toEqual(['10']);
        expect(state.houseIds).toEqual(['20', '21']);
    });
});
