export interface BookListItem {
    id: string;
    url: string;

    name: string;
    released: string;
    authors: string[];
}

export interface BookDetails {
    id: string;
    url: string;

    name: string;
    isbn: string;
    authors: string[];
    numberOfPages: number;
    publisher: string;
    country: string;
    mediaType: string;
    released: string;

    characters: string[];
    povCharacters: string[];
}
