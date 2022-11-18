import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ServerService } from '@data/service/server.service';

@Injectable({
  providedIn: 'root'
})
export class ServerResolver implements Resolve<number> {
  constructor(private serverService: ServerService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<number> {
    return this.serverService.getServersCount().pipe(map(res => res));
  }
}
