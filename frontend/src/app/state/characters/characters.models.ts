import { CharacterDetails, CharacterListItem } from '../../models/character';

export interface CharactersState {
    list: CharacterListItem[];
    listLoading: boolean;
    listError: string | null;

    detailsById: Record<string, CharacterDetails>;
    detailsLoading: boolean;
    detailsError: string | null;

    page: number;
    pageSize: number;
}

export const initialCharactersState: CharactersState = {
    list: [],
    listLoading: false,
    listError: null,

    detailsById: {},
    detailsLoading: false,
    detailsError: null,

    page: 1,
    pageSize: 20,
};
