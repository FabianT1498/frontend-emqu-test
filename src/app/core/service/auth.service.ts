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
      "client_id": 6,
      "client_secret": 'PwlMlZH0wQcXsY3Bf6sAyNf1yTNcOMCxjS14xaPG',
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
