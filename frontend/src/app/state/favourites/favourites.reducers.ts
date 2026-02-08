import { createReducer, on } from '@ngrx/store';
import * as Actions from './favourites.actions';
import { initialFavouritesState } from './favourites.models';

export const favouritesFeatureKey = 'favourites';

function addUnique(list: string[], id: string): string[] {
    return list.includes(id) ? list : [...list, id];
}
function removeOne(list: string[], id: string): string[] {
    return list.filter(x => x !== id);
}

export const favouritesReducer = createReducer(
    initialFavouritesState,

    on(Actions.addFavouriteCharacter, (s, { id }) => ({
        ...s,
        characterIds: addUnique(s.characterIds, id),
    })),
    on(Actions.removeFavouriteCharacter, (s, { id }) => ({
        ...s,
        characterIds: removeOne(s.characterIds, id),
    })),

    on(Actions.addFavouriteBook, (s, { id }) => ({
        ...s,
        bookIds: addUnique(s.bookIds, id),
    })),
    on(Actions.removeFavouriteBook, (s, { id }) => ({
        ...s,
        bookIds: removeOne(s.bookIds, id),
    })),

    on(Actions.addFavouriteHouse, (s, { id }) => ({
        ...s,
        houseIds: addUnique(s.houseIds, id),
    })),
    on(Actions.removeFavouriteHouse, (s, { id }) => ({
        ...s,
        houseIds: removeOne(s.houseIds, id),
    })),
    on(Actions.loadFavouritesFromApiSuccess, (state, { favourites }) => ({
        ...state,
        characterIds: favourites.characters,
        bookIds: favourites.books,
        houseIds: favourites.houses,
    })),
);
