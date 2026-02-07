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
export const selectBooksQuery = createSelector(
    selectBooksState,
    s => s.query
);

export const selectFilteredBooksList = createSelector(
    selectBooksList,
    selectBooksQuery,
    (list, q) => {
        const query = (q || '').trim().toLowerCase();
        if (!query) return list;

        return list.filter(b => {
            const name = (b.name || '').toLowerCase();
            const authors = (b.authors || []).join(', ').toLowerCase();
            return (
                name.includes(query) ||
                authors.includes(query)
            );
        });
    }
);


