import { Action } from '@ngrx/store';

export const SIGNUP_START = '[Auth] Signup Start';
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATION_SUCCESS = '[Auth] Authentication Success';
export const AUTHENTICATION_FAIL = '[Auth] Authentication Fail';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';
export const REDIRECT = '[Auth] Redirect';

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AutheticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: number;
    }
  ) {}
}

export class AuthenticationFail implements Action {
  readonly type = AUTHENTICATION_FAIL;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
  
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: number;
    }
  ) {}
}

export class AutoLogout implements Action {
  readonly type = AUTO_LOGOUT;

  constructor(public payload: number) {}
}

export class Redirect implements Action {
  readonly type = REDIRECT;
}

export type AuthActions =
  | SignUpStart
  | LoginStart
  | AutheticationSuccess
  | AuthenticationFail
  | Logout
  | ClearError
  | AutoLogin
  | AutoLogout
  | Redirect;
