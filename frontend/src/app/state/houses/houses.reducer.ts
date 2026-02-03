import { createReducer, on } from '@ngrx/store';
import * as Actions from './houses.actions';
import { HousesState, initialHousesState } from './houses.models';

export const housesFeatureKey = 'houses';

export const housesReducer = createReducer(
    initialHousesState,

    on(Actions.loadHouses, (state, { page, pageSize }) => ({
        ...state,
        page,
        pageSize,
        listLoading: true,
        listError: null,
    })),

    on(Actions.loadHousesSuccess, (state, { items }) => ({
        ...state,
        list: items,
        listLoading: false,
    })),

    on(Actions.loadHousesFailure, (state, { error }) => ({
        ...state,
        listLoading: false,
        listError: error,
    })),

    on(Actions.loadHouseDetails, (state) => ({
        ...state,
        detailsLoading: true,
        detailsError: null,
    })),

    on(Actions.loadHouseDetailsSuccess, (state, { item }) => ({
        ...state,
        detailsLoading: false,
        detailsById: { ...state.detailsById, [item.id]: item },
    })),

    on(Actions.loadHouseDetailsFailure, (state, { error }) => ({
        ...state,
        detailsLoading: false,
        detailsError: error,
    }))
);
