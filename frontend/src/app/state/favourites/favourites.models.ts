export interface FavouritesState {
    characterIds: string[];
    bookIds: string[];
    houseIds: string[];
}

export const initialFavouritesState: FavouritesState = {
    characterIds: [],
    bookIds: [],
    houseIds: [],
};
