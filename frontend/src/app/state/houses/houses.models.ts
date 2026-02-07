import { HouseDetails, HouseListItem } from '../../models/house';

export interface HousesState {
    list: HouseListItem[];
    listLoading: boolean;
    listError: string | null;

    detailsById: Record<string, HouseDetails>;
    detailsLoading: boolean;
    detailsError: string | null;

    query: string;

    page: number;
    pageSize: number;
}

export const initialHousesState: HousesState = {
    list: [],
    listLoading: false,
    listError: null,

    detailsById: {},
    detailsLoading: false,
    detailsError: null,

    query: '',
    
    page: 1,
    pageSize: 20,
};
