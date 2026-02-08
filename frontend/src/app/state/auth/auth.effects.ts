import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            map(() => {
                this.authService.logout();
                return AuthActions.logoutSuccess();
            })
        )
    );

    logoutRedirect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logoutSuccess),
                tap(() => this.router.navigateByUrl('/'))
            ),
        { dispatch: false }
    );

    constructor(private readonly actions$: Actions, private  readonly authService: AuthService, private readonly router: Router) { }
}
