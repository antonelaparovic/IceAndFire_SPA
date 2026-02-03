import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HousesState } from './houses.models';
import { housesFeatureKey } from './houses.reducer';

export const selectHousesState =
    createFeatureSelector<HousesState>(housesFeatureKey);

export const selectHousesList = createSelector(
    selectHousesState,
    s => s.list
);

export const selectHousesListLoading = createSelector(
    selectHousesState,
    s => s.listLoading
);

export const selectHousesListError = createSelector(
    selectHousesState,
    s => s.listError
);

export const selectHousesPage = createSelector(
    selectHousesState,
    s => s.page
);

export const selectHousesPageSize = createSelector(
    selectHousesState,
    s => s.pageSize
);

export const selectHouseDetailsById = (id: string) =>
    createSelector(selectHousesState, s => s.detailsById[id]);

export const selectHouseDetailsLoading = createSelector(
    selectHousesState,
    s => s.detailsLoading
);

export const selectHouseDetailsError = createSelector(
    selectHousesState,
    s => s.detailsError
);

