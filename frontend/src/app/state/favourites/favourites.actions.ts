import { createAction, props } from '@ngrx/store';

export const addFavouriteCharacter = createAction(
    '[Favourites] Add Character',
    props<{ id: string }>()
);
export const removeFavouriteCharacter = createAction(
    '[Favourites] Remove Character',
    props<{ id: string }>()
);

export const addFavouriteBook = createAction(
    '[Favourites] Add Book',
    props<{ id: string }>()
);
export const removeFavouriteBook = createAction(
    '[Favourites] Remove Book',
    props<{ id: string }>()
);

export const addFavouriteHouse = createAction(
    '[Favourites] Add House',
    props<{ id: string }>()
);
export const removeFavouriteHouse = createAction(
    '[Favourites] Remove House',
    props<{ id: string }>()
);
