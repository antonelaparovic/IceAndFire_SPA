import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Store } from '@ngrx/store';
import * as FavActions from '../../state/favourites/favourites.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  loading = false;
  error: string | null = null;

  form = new FormGroup({
    email: new FormControl('user1@test.com', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('Password123!', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly store: Store
  ) { }

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const { email, password } = this.form.getRawValue();

    this.auth.login({ email, password }).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.store.dispatch(FavActions.loadFavouritesFromApi());
        this.loading = false;
        this.router.navigateByUrl('/characters');
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Login failed';
      },
    });
  }

  logout(): void {
    this.auth.clearToken();
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
