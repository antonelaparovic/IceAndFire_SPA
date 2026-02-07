import { createAction, props } from '@ngrx/store';
import { BookDetails, BookListItem } from '../../models/book';

export const loadBooks = createAction(
    '[Books] Load List',
);

export const loadBooksSuccess = createAction(
    '[Books] Load List Success',
    props<{ items: BookListItem[] }>()
);

export const loadBooksFailure = createAction(
    '[Books] Load List Failure',
    props<{ error: string }>()
);

export const loadBookDetails = createAction(
    '[Books] Load Details',
    props<{ id: string }>()
);

export const loadBookDetailsSuccess = createAction(
    '[Books] Load Details Success',
    props<{ item: BookDetails }>()
);

export const loadBooksDetailsFailure = createAction(
    '[Books] Load Details Failure',
    props<{ error: string }>()
);

export const setBooksQuery = createAction(
    '[Books] Set Query',
    props<{ query: string }>()
);

