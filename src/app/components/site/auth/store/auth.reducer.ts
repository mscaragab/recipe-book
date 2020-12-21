import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';
import * as fromApp from '../../../../store/app.reducer';

export interface AuthState {
  user: User;
  authError: string;
  isLoading: boolean;
}


export interface AppState extends fromApp.AppState {
  auth: AuthState
}

const initialState: AuthState = {
  user: null,
  authError: null,
  isLoading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  let user = null;
  switch (action.type) {
    case AuthActions.SIGNUP_START:
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        isLoading: true,
      };
    case AuthActions.AUTHENTICATION_SUCCESS:
      user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
        authError: null,
        isLoading: false,
      };
    case AuthActions.AUTHENTICATION_FAIL:
      return {
        ...state,
        authError: action.payload,
        isLoading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    case AuthActions.AUTO_LOGIN:
      user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
        authError: null,
        isLoading: false,
      };
    case AuthActions.AUTO_LOGOUT:
      return {
        ...state,
      };
    default:
      return state;
  }
}

const getAuthState = createFeatureSelector<AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, state => state.user != null);
