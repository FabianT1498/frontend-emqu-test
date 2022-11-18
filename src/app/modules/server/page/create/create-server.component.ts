import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Router } from '@angular/router';

import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import {
  catchError,
  finalize,
  take,
  takeUntil
} from 'rxjs/operators';

import { of, Subject } from 'rxjs';

/** SERVICES */
import { ServerService } from '@data/service/server.service';

/** SCHEMAS */
import { Server, ServerModel } from '@data/schema/server';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
  styleUrls: ['./create-server.component.scss'],
})
export class CreateServerComponent implements OnInit, OnDestroy {
  
  /** Signal to unsubscribe from all observables */
  private signal$: Subject<any>;

  isLoading: boolean;

  /** FORM GROUPS */
  serverForm: FormGroup;

  /* New payment subject */
  newRecord$: Subject<any>;

  errors: string[];
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private serverService: ServerService,
  ) {}

  ngOnInit() {
    this.init();
    this.buildForm();
    this.initEventListener();
  }

  private init() {
    this.isLoading = false;
    this.newRecord$ = new Subject<any>();
  }

  private buildForm(): void {
    this.serverForm = this.formBuilder.group({
      ipv4: ['', [Validators.required, Validators.pattern(/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/g)]],
      domainName: ['', Validators.required],
    });
  }

  get f() {
    return this.serverForm.controls;
  }

  private initEventListener(){
    // this.serverService
    //   .createServer(this.newRecord$)
    //   .pipe(
    //     takeUntil(this.signal$),
    //     catchError(err => {
    //       console.log(err)
    //       // this.errors = Object.values(err.errors);
    //       console.log(this.errors);
    //       return of(err);
    //     }),
    //     finalize(() => (this.isLoading = false))
    //   )
    //   .subscribe(res => {
    //     console.log(res);

    //     if (res.status === 1) {
    //       this.router.navigate(['/servers']);
    //     }
    //   });
  }

  
  createServer() {
   
    this.isLoading = true;

    const server: Server = {
      ipv4: this.serverForm.get('ipv4').value,
      domainName: this.serverForm.get('domainName').value,
    };

    const serverModel = new ServerModel(server);  

    this.serverService
        .createServer(serverModel)
        .pipe(
          take(1),
          catchError(err => {
            console.log(err.message);
            return of(err);
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe(res => {
          console.log(res);

          if (res.status === 1) {
            this.router.navigate(['/servers']);
          }
        });
  }
  
  ngOnDestroy(): void {

    // Signal all streams to complete
    this.signal$.next('');
    this.signal$.complete();
  }
}
