import * as AuthSelectors from './auth.selectors';
import { authFeatureKey } from './auth.reducer';
import { AuthState } from './auth.models';

describe('auth selectors', () => {
    const loggedInState: AuthState = {
        user: { email: 'user1@test.com' },
        isAuthenticated: true,
    };

    const loggedOutState: AuthState = {
        user: null,
        isAuthenticated: false,
    };

    it('selectAuthState should return feature state', () => {
        const rootState = { [authFeatureKey]: loggedInState } as any;
        expect(AuthSelectors.selectAuthState(rootState)).toEqual(loggedInState);
    });

    it('selectUser projector should return user', () => {
        expect(AuthSelectors.selectUser.projector(loggedInState)).toEqual({ email: 'user1@test.com' });
        expect(AuthSelectors.selectUser.projector(loggedOutState)).toBeNull();
    });

    it('selectUserEmail projector should return email when user exists', () => {
        expect(AuthSelectors.selectUserEmail.projector({ email: 'user1@test.com' })).toBe('user1@test.com');
    });

    it('selectUserEmail projector should return null when user is null/undefined', () => {
        expect(AuthSelectors.selectUserEmail.projector(null as any)).toBeNull();
        expect(AuthSelectors.selectUserEmail.projector(undefined as any)).toBeNull();
    });

    it('selectIsAuthenticated projector should return boolean', () => {
        expect(AuthSelectors.selectIsAuthenticated.projector(loggedInState)).toBeTrue();
        expect(AuthSelectors.selectIsAuthenticated.projector(loggedOutState)).toBeFalse();
    });
});
