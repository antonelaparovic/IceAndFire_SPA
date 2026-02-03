import { BookDetails, BookListItem } from '../../models/book';

export interface BooksState {
    list: BookListItem[];
    listLoading: boolean;
    listError: string | null;

    detailsById: Record<string, BookDetails>;
    detailsLoading: boolean;
    detailsError: string | null;

    page: number;
    pageSize: number;
}

export const initialBooksState: BooksState = {
    list: [],
    listLoading: false,
    listError: null,

    detailsById: {},
    detailsLoading: false,
    detailsError: null,

    page: 1,
    pageSize: 20,
};
