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
export const selectCharactersQuery = createSelector(
    selectCharactersState,
    s => s.query
);
export const selectFilteredCharactersList = createSelector(
    selectCharactersList,
    selectCharactersQuery,
    (list, q) => {
        const query = (q || '').trim().toLowerCase();
        if (!query) return list;

        return list.filter(x => {
            const name = (x.name || '').toLowerCase();
            const gender = (x.gender || '').toLowerCase();
            const culture = (x.culture || '').toLowerCase();
            return (
                name.includes(query) ||
                gender.includes(query) ||
                culture.includes(query)
            );
        });
    }
);

