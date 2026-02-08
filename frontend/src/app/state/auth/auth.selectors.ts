import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';
import { authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUser = createSelector(selectAuthState, s => s.user);
export const selectUserEmail = createSelector(selectUser, u => u?.email ?? null);
export const selectIsAuthenticated = createSelector(selectAuthState, s => s.isAuthenticated);
