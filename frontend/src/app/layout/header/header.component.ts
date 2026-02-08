import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import * as AuthSelectors from '../../state/auth/auth.selector';
import * as AuthActions from '../../state/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private readonly auth: AuthService, private readonly router: Router, private readonly store: Store) { }

  userEmail$ = this.store.select(AuthSelectors.selectUserEmail);

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
