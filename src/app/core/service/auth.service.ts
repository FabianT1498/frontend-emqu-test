import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '@data/schema/user';

interface LoginContextInterface {
  username: string;
  password: string;
  token?: string;
}



const defaultUser = {
  username: 'Mathis',
  password: '12345',
  token: '12345'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  private url = 'http://localhost:8000/'

  constructor(private http: HttpClient) {}

  login(loginContext: LoginContextInterface): Observable<any> {
    
    let data = {
      ...loginContext,
      "grant_type": 'password',
      "client_id": 2,
      "client_secret": 'Nl8uEVBTzUEq4NL3GjC3BxNdX5BBeqRHSIJhQnL0',
      "scope": '*'
    }
    return this.http.post(
      this.url + 'oauth/token',
      data, 
      {
        headers: new HttpHeaders({
          "content-type": 'application/json',
          "Access-Control-Allow-Origin": '*'
        })
      }
    )

    // return of(loginContext);

  }

  logout(): Observable<boolean> {
    return of(false);
  }

  getToken() {
    return this.getToken;
  }
}
