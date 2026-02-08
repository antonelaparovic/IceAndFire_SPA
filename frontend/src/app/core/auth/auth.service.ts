import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: { id: string; email: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = environment.apiBaseUrl;
  private readonly TOKEN_KEY = 'icefire_token';
  private readonly USER_KEY = 'icefire_user';

  constructor(private readonly http: HttpClient) { }

  login(req: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.API}/auth/login`, req);
  }

  register(req: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.API}/auth/register`, req);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  setUser(user: { id: string; email: string }): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): { id: string; email: string } | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  logout(): void {
    this.clearToken();
    this.clearUser();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
