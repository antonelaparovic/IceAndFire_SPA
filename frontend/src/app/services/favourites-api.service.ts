import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type FavouritesPayload = {
  characters: string[];
  books: string[];
  houses: string[];
};

@Injectable({ providedIn: 'root' })
export class FavouritesApiService {
  private readonly API = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) { }

  getMine() {
    return this.http.get<FavouritesPayload>(`${this.API}/me/favourites`);
  }

  saveMine(payload: FavouritesPayload) {
    return this.http.put<FavouritesPayload>(`${this.API}/me/favourites`, payload);
  }
}
