import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavouritesState } from './favourites.models';
import { favouritesFeatureKey } from './favourites.reducers';

export const selectFavouritesState =
    createFeatureSelector<FavouritesState>(favouritesFeatureKey);

export const selectFavouriteCharacterIds = createSelector(
    selectFavouritesState,
    s => s.characterIds
);

export const selectFavouriteBookIds = createSelector(
    selectFavouritesState,
    s => s.bookIds
);

export const selectFavouriteHouseIds = createSelector(
    selectFavouritesState,
    s => s.houseIds
);

export const selectIsFavouriteCharacter = (id: string) =>
    createSelector(selectFavouriteCharacterIds, ids => ids.includes(id));

export const selectIsFavouriteBook = (id: string) =>
    createSelector(selectFavouriteBookIds, ids => ids.includes(id));

export const selectIsFavouriteHouse = (id: string) =>
    createSelector(selectFavouriteHouseIds, ids => ids.includes(id));
