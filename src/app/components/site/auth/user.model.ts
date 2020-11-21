export class User {
  constructor(public email: string, public id: string, private _token: string, private _expirationDate: number) {}

  get token() {
    if(!this._token || this._expirationDate < new Date().getTime()) {
      return null;
    }
    return this._token;
  }
}
