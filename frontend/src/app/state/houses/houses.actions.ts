import { createAction, props } from '@ngrx/store';
import { HouseDetails, HouseListItem } from '../../models/house';

export const loadHouses = createAction(
    '[Houses] Load List',
    props<{ page: number; pageSize: number }>()
);

export const loadHousesSuccess = createAction(
    '[Houses] Load List Success',
    props<{ items: HouseListItem[] }>()
);

export const loadHousesFailure = createAction(
    '[Houses] Load List Failure',
    props<{ error: string }>()
);

export const loadHouseDetails = createAction(
    '[Houses] Load Details',
    props<{ id: string }>()
);

export const loadHouseDetailsSuccess = createAction(
    '[Houses] Load Details Success',
    props<{ item: HouseDetails }>()
);

export const loadHouseDetailsFailure = createAction(
    '[Houses] Load Details Failure',
    props<{ error: string }>()
);
export const setHousesQuery = createAction(
    '[Houses] Set Query',
    props<{ query: string }>()
);

