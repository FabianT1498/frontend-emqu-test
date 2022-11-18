import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import {
  catchError,
  mergeMap
} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private url = 'http://localhost:8000/'

  constructor(private _router: Router, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        let token = localStorage.getItem('access_token');

        if (token) {
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(req).pipe(
          catchError(err => {
            console.log(err);

            if (err.status === 401) {
              if (err.error.message == "Token is exp") {
                
                //TODO: Token refreshing
                //Genrate params for token refreshing
                let params = {
                  token: token,
                  refreshToken: localStorage.getItem("refresh_token")
                };
                
                return this.http
                  .post(this.url + 'oauth/token/refresh', params).pipe(
                    mergeMap((data: any) => {

                      //If reload successful update tokens
                      if (data.status == 200) {
                        //Update tokens
                        localStorage.setItem("access_token", data.result['access_token']);
                        localStorage.setItem("refresh_token", data.result['refresh_token']);
                        
                        //Clone our field request ant try to resend it
                        req = req.clone({
                          setHeaders: {
                            'access_token': data.result['access_token']
                          }
                        });

                        return next.handle(req).pipe(
                          catchError(err => {
                            return throwError(err);
                          }))
                      } else {
                        //Logout from account or do some other stuff
                      }
                    })
                  );
              }
            }

            return throwError(err);
          })
        )
    }
}
