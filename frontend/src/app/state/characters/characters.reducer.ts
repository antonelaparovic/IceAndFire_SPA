import { createReducer, on } from '@ngrx/store';
import * as Actions from './characters.actions';
import { CharactersState, initialCharactersState } from './characters.models';

export const charactersFeatureKey = 'characters';

export const charactersReducer = createReducer(
    initialCharactersState,

    on(Actions.loadCharacters, (state, { page, pageSize }) => ({
        ...state,
        page,
        pageSize,
        listLoading: true,
        listError: null,
    })),

    on(Actions.loadCharactersSuccess, (state, { items }) => ({
        ...state,
        list: items,
        listLoading: false,
    })),

    on(Actions.loadCharactersFailure, (state, { error }) => ({
        ...state,
        listLoading: false,
        listError: error,
    })),

    on(Actions.loadCharacterDetails, (state) => ({
        ...state,
        detailsLoading: true,
        detailsError: null,
    })),

    on(Actions.loadCharacterDetailsSuccess, (state, { item }) => ({
        ...state,
        detailsLoading: false,
        detailsById: { ...state.detailsById, [item.id]: item },
    })),

    on(Actions.loadCharacterDetailsFailure, (state, { error }) => ({
        ...state,
        detailsLoading: false,
        detailsError: error,
    }))
);
