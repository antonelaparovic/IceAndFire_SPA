import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { Store } from '@ngrx/store';
import * as FavActions from '../../state/favourites/favourites.actions';
import * as AuthActions from '../../state/auth/auth.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  loading = false;
  error: string | null = null;

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });


  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    // hydrate user email on refresh if token exists
    const user = this.auth.getUser();
    if (user && this.auth.isLoggedIn()) {
      this.store.dispatch(AuthActions.setUser({ user: { email: user.email } }));
    }
  }

  get emailCtrl() { return this.form.controls.email; }
  get passwordCtrl() { return this.form.controls.password; }

  showError(ctrl: FormControl<string>): boolean {
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

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
        this.auth.setUser(res.user);

        // store email for navbar
        this.store.dispatch(AuthActions.setUser({ user: { email: res.user.email } }));

        this.store.dispatch(FavActions.loadFavouritesFromApi());

        this.loading = false;
        this.router.navigateByUrl('/characters');
      },
      error: (err) => {
        this.loading = false;

        const status = err?.status;
        if (status === 401 || status === 403) {
          this.error = 'Invalid email or password. Please try again.';
          return;
        }

        this.error = err?.error?.message ?? 'Login failed. Please try again.';
      },
    });
  }

  logout(): void {
    // clears token+user via effect and resets auth store
    this.store.dispatch(AuthActions.logout());
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
