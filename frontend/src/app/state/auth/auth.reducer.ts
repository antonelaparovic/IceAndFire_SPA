import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.models';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export const authReducer = createReducer(
    initialState,

    on(AuthActions.setUser, (state, { user }) => ({
        ...state,
        user,
        isAuthenticated: true,
    })),

    on(AuthActions.clearUser, () => ({
        ...initialState,
    })),

    on(AuthActions.logoutSuccess, () => ({
        ...initialState,
    }))
);
