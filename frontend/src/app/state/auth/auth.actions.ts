import { createAction, props } from '@ngrx/store';
import { User } from './auth.models';

export const setUser = createAction('[Auth] Set User', props<{ user: User }>());
export const clearUser = createAction('[Auth] Clear User');

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: unknown }>());
