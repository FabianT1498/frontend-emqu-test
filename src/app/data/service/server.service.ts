import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

// import { IpcService } from '@app/service/ipc.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Server, ServerModel } from '../schema/server';

import { handleError } from './handleError';
// import { MonthlyPayment } from '@data/schema/monthly-payment';
// import { PaymentSearch } from '@data/interface/search-payments';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private url = 'http://localhost:8000/api/'

  constructor(private http: HttpClient) {}

  // getPayments(data: Observable<PaymentSearch>): Observable<any> {
  //   return data.pipe(
  //     switchMap(req => {
  //       console.log(req);
  //       return from(
  //         this.ipc.invoke('get-payments', ...Object.values(req))
  //       ).pipe(
  //         map(res => {
  //           if (res.status === 0) {
  //             throw new Error(res.message);
  //           }
  //           console.log(res);
  //           return res;
  //         })
  //       );
  //     })
  //   );
  // }

  getServersCount(): Observable<number> {

    return this.http.get(this.url + 'servers/count').pipe(
      map((res: any) => {
        if (res.status === 400) {
          throw new Error(res.message);
        }
        return res.data;
      })
    );
  }

  // createPayment(data: Observable<any>): Observable<any> {
  //   return data.pipe(
  //     switchMap(req =>
  //       from(this.ipc.invoke('create-payment', ...Object.values(req))).pipe(
  //         map(res => {
  //           if (res.status === 0) {
  //             throw res;
  //           }
  //           console.log(res);
  //           return res;
  //         })
  //       )
  //     )
  //   );
  // }

  // editPayment(paymentID: string = '-1'): Observable<any> {
  //   return from(this.ipc.invoke('edit-payment', paymentID)).pipe(
  //     map(res => {
  //       if (res.status === 0) {
  //         throw new Error(res.message);
  //       }

  //       console.log(res);

  //       return res.data;
  //     })
  //   );
  // }

  // updatePayment(data: Observable<PaymentModel>): Observable<any> {
  //   return data.pipe(
  //     switchMap(req =>
  //       from(this.ipc.invoke('update-payment', req)).pipe(
  //         map(res => {
  //           if (res.status === 0) {
  //             throw res;
  //           }
  //           console.log(res);
  //           return res;
  //         })
  //       )
  //     )
  //   );
  // }
}
