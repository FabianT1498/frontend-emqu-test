import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  finalize,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

import { ServerService } from '@data/service/server.service';
import { Server } from '@data/schema/server';
import { ServerSearch } from '@data/interface/server-search';

export class ServersDataSource implements DataSource<Server> {
  private serversSubject = new BehaviorSubject<Server[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private signal$ = new Subject<any>();

  public loading$ = this.loadingSubject.asObservable();

  constructor(private serverService: ServerService) {}

  connect(collectionViewer: CollectionViewer): Observable<Server[]> {
    return this.serversSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.serversSubject.complete();
    this.loadingSubject.complete();
    this.signal$.next('');
    this.signal$.complete();
  }

  loadServers(searchData: Observable<ServerSearch>) {
    this.serverService
      .getServers(searchData)
      .pipe(
        takeUntil(this.signal$),
        catchError(() => of([])),
        tap((next: any) => {
          this.loadingSubject.next(true);
        })
      )
      .subscribe(res => {
        console.log(res);
        this.loadingSubject.next(false);
        this.serversSubject.next(res.data);
      });
  }
}
