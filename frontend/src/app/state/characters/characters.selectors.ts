import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharactersState } from './characters.models';
import { charactersFeatureKey } from './characters.reducer';

export const selectCharactersState =
    createFeatureSelector<CharactersState>(charactersFeatureKey);

export const selectCharactersList = createSelector(
    selectCharactersState,
    s => s.list
);

export const selectCharactersListLoading = createSelector(
    selectCharactersState,
    s => s.listLoading
);

export const selectCharactersListError = createSelector(
    selectCharactersState,
    s => s.listError
);

export const selectCharactersPage = createSelector(
    selectCharactersState,
    s => s.page
);

export const selectCharactersPageSize = createSelector(
    selectCharactersState,
    s => s.pageSize
);

export const selectCharacterDetailsById = (id: string) =>
    createSelector(selectCharactersState, s => s.detailsById[id]);

export const selectCharacterDetailsLoading = createSelector(
    selectCharactersState,
    s => s.detailsLoading
);

export const selectCharacterDetailsError = createSelector(
    selectCharactersState,
    s => s.detailsError
);

