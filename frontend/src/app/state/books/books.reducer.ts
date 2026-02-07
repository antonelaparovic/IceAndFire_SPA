import { createReducer, on } from '@ngrx/store';
import * as Actions from './books.actions';
import { BooksState, initialBooksState } from './books.models';

export const booksFeatureKey = 'books';

export const booksReducer = createReducer(
    initialBooksState,

    on(Actions.loadBooks, (state) => ({
        ...state,
        listLoading: true,
        listError: null,
    })),

    on(Actions.loadBooksSuccess, (state, { items }) => ({
        ...state,
        list: items,
        listLoading: false,
    })),

    on(Actions.loadBooksFailure, (state, { error }) => ({
        ...state,
        listLoading: false,
        listError: error,
    })),

    on(Actions.loadBookDetails, (state) => ({
        ...state,
        detailsLoading: true,
        detailsError: null,
    })),

    on(Actions.loadBookDetailsSuccess, (state, { item }) => ({
        ...state,
        detailsLoading: false,
        detailsById: { ...state.detailsById, [item.id]: item },
    })),

    on(Actions.loadBooksDetailsFailure, (state, { error }) => ({
        ...state,
        detailsLoading: false,
        detailsError: error,
    })),
    on(Actions.setBooksQuery, (state, { query }) => ({
        ...state,
        query,
    })),
);
