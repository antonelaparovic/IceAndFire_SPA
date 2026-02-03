import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.models';
import { booksFeatureKey } from './books.reducer';

export const selectBooksState =
    createFeatureSelector<BooksState>(booksFeatureKey);

export const selectBooksList = createSelector(
    selectBooksState,
    s => s.list
);

export const selectBooksListLoading = createSelector(
    selectBooksState,
    s => s.listLoading
);

export const selectBooksListError = createSelector(
    selectBooksState,
    s => s.listError
);

export const selectBooksPage = createSelector(
    selectBooksState,
    s => s.page
);

export const selectBooksPageSize = createSelector(
    selectBooksState,
    s => s.pageSize
);

export const selectBookDetailsById = (id: string) =>
    createSelector(selectBooksState, s => s.detailsById[id]);

export const selectBookDetailsLoading = createSelector(
    selectBooksState,
    s => s.detailsLoading
);

export const selectBookDetailsError = createSelector(
    selectBooksState,
    s => s.detailsError
);

