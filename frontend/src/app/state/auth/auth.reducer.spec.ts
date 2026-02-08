import * as AuthActions from './auth.actions';
import { authReducer, initialState } from './auth.reducer';

describe('authReducer', () => {
    it('should return initial state for unknown action', () => {
        const action = { type: '[Test] Unknown' } as any;
        const state = authReducer(undefined, action);

        expect(state).toEqual(initialState);
    });

    it('setUser should set user email and isAuthenticated=true', () => {
        const state = authReducer(
            initialState,
            AuthActions.setUser({ user: { email: 'user1@test.com' } })
        );

        expect(state.user).toEqual({ email: 'user1@test.com' });
        expect(state.isAuthenticated).toBeTrue();
    });

    it('clearUser should reset to initial state', () => {
        const seeded = {
            user: { email: 'user1@test.com' },
            isAuthenticated: true,
        };

        const state = authReducer(seeded as any, AuthActions.clearUser());

        expect(state).toEqual(initialState);
    });

    it('logoutSuccess should reset to initial state', () => {
        const seeded = {
            user: { email: 'user1@test.com' },
            isAuthenticated: true,
        };

        const state = authReducer(seeded as any, AuthActions.logoutSuccess());

        expect(state).toEqual(initialState);
    });
});
