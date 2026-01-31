import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { CharacterDetails, CharacterListItem } from '../models/character';
import { BookDetails, BookListItem } from '../models/book';
import { HouseDetails, HouseListItem } from '../models/house';

@Injectable({
  providedIn: 'root',
})
export class IceAndFireApiService {
  private readonly baseUrl = 'https://anapioficeandfire.com/api';

  constructor(private http: HttpClient) { }

  // Characters
  getCharacters(page = 1, pageSize = 20): Observable<CharacterListItem[]> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<any[]>(`${this.baseUrl}/characters`, { params }).pipe(
      map(items => items.map(x => this.mapCharacterListItem(x)))
    );
  }

  getCharacterById(id: string): Observable<CharacterDetails> {
    return this.http.get<any>(`${this.baseUrl}/characters/${id}`).pipe(
      map(x => this.mapCharacterDetails(x))
    );
  }

  // Books
  getBooks(): Observable<BookListItem[]> {
    return this.http.get<any[]>(`${this.baseUrl}/books`).pipe(
      map(items => items.map(x => this.mapBookListItem(x)))
    );
  }

  getBookById(id: string): Observable<BookDetails> {
    return this.http.get<any>(`${this.baseUrl}/books/${id}`).pipe(
      map(x => this.mapBookDetails(x))
    );
  }

  // Houses
  getHouses(page = 1, pageSize = 20): Observable<HouseListItem[]> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<any[]>(`${this.baseUrl}/houses`, { params }).pipe(
      map(items => items.map(x => this.mapHouseListItem(x)))
    );
  }

  getHouseById(id: string): Observable<HouseDetails> {
    return this.http.get<any>(`${this.baseUrl}/houses/${id}`).pipe(
      map(x => this.mapHouseDetails(x))
    );
  }

  // Mapping: Characters
  private mapCharacterListItem(api: any): CharacterListItem {
    const url = this.asString(api.url);

    return {
      id: this.idFromUrl(url),
      url,
      name: this.asString(api.name).trim() || 'Unknown',
      gender: this.asString(api.gender),
      culture: this.asString(api.culture),
    };
  }

  private mapCharacterDetails(api: any): CharacterDetails {
    const url = this.asString(api.url);

    return {
      id: this.idFromUrl(url),
      url,
      name: this.asString(api.name).trim() || 'Unknown',
      gender: this.asString(api.gender),
      culture: this.asString(api.culture),
      born: this.asString(api.born),
      died: this.asString(api.died),
      titles: this.asStringArray(api.titles),
      aliases: this.asStringArray(api.aliases),
      father: this.asString(api.father),
      mother: this.asString(api.mother),
      spouse: this.asString(api.spouse),
      allegiances: this.asStringArray(api.allegiances),
      books: this.asStringArray(api.books),
      povBooks: this.asStringArray(api.povBooks),
      tvSeries: this.asStringArray(api.tvSeries),
      playedBy: this.asStringArray(api.playedBy),
    };
  }

  // Mapping: Books
  private mapBookListItem(api: any): BookListItem {
    const url = this.asString(api.url);

    return {
      id: this.idFromUrl(url),
      url,
      name: this.asString(api.name).trim() || 'Unknown',
      released: this.asString(api.released),
      authors: this.asStringArray(api.authors),
    };
  }

  private mapBookDetails(api: any): BookDetails {
    const url = this.asString(api.url);

    return {
      id: this.idFromUrl(url),
      url,
      name: this.asString(api.name).trim() || 'Unknown',
      isbn: this.asString(api.isbn),
      authors: this.asStringArray(api.authors),
      numberOfPages: this.asNumber(api.numberOfPages),
      publisher: this.asString(api.publisher),
      country: this.asString(api.country),
      mediaType: this.asString(api.mediaType),
      released: this.asString(api.released),
      characters: this.asStringArray(api.characters),
      povCharacters: this.asStringArray(api.povCharacters),
    };
  }

  // Mapping: Houses
  private mapHouseListItem(api: any): HouseListItem {
    const url = this.asString(api.url);

    return {
      id: this.idFromUrl(url),
      url,
      name: this.asString(api.name).trim() || 'Unknown',
      region: this.asString(api.region),
      words: this.asString(api.words),
    };
  }

  private mapHouseDetails(api: any): HouseDetails {
    const url = this.asString(api.url);

    return {
      id: this.idFromUrl(url),
      url,
      name: this.asString(api.name).trim() || 'Unknown',
      region: this.asString(api.region),
      coatOfArms: this.asString(api.coatOfArms),
      words: this.asString(api.words),
      titles: this.asStringArray(api.titles),
      seats: this.asStringArray(api.seats),
      currentLord: this.asString(api.currentLord),
      heir: this.asString(api.heir),
      overlord: this.asString(api.overlord),
      founded: this.asString(api.founded),
      founder: this.asString(api.founder),
      diedOut: this.asString(api.diedOut),
      ancestralWeapons: this.asStringArray(api.ancestralWeapons),
      cadetBranches: this.asStringArray(api.cadetBranches),
      swornMembers: this.asStringArray(api.swornMembers),
    };
  }

  // helper methids
  private asString(value: unknown): string {
    return typeof value === 'string' ? value : '';
  }

  private asStringArray(value: unknown): string[] {
    return Array.isArray(value) ? value.filter(v => typeof v === 'string') : [];
  }

  private asNumber(value: unknown): number {
    return typeof value === 'number' && Number.isFinite(value) ? value : 0;
  }

  private idFromUrl(url: string): string {
    if (!url) return '';
    const clean = url.endsWith('/') ? url.slice(0, -1) : url;
    return clean.split('/').pop() ?? '';
  }
}
