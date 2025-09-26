import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout } from './auth.actions';
import { initialState, AuthState } from './auth.state';

export const authReducer = createReducer(
  initialState,

  on(loginSuccess, (actualState: AuthState, { token, user }) => ({
    ...actualState,
    token,
    user,
    error: null,
  })),

  on(loginFailure, (actualState: AuthState, { error }) => ({
    ...actualState,
    token: null,
    user: null,
    error,
  })),

  on(logout, (actualState: AuthState) => ({
    ...actualState,
    token: null,
    user: null,
    error: null,
  }))
);
