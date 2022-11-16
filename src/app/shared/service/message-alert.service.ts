import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageAlertService {
  message$ = new BehaviorSubject<string>('');

  setMessage(mess: string) {
    this.message$.next(mess);
  }
}
