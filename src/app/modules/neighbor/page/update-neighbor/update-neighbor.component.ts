import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';

/** SERVICES */
import { NeighborService } from '@data/service/neightbor.service';

/** SCHEMAS */
import { Neighbor, NeighborModel } from '@data/schema/neighbor';
import { catchError, finalize, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MessageAlertService } from '@shared/service/message-alert.service';

@Component({
  selector: 'app-update-neighbor',
  templateUrl: './update-neighbor.component.html',
  styleUrls: ['./update-neighbor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateNeighborComponent implements OnInit {
  isLoading: boolean;
  formValuesValid: Neighbor | null;
  neighbor: Neighbor;
  errors: string[];

  constructor(
    private neighborService: NeighborService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageAlertService
  ) {}

  ngOnInit() {
    this.init();
  }

  private init() {
    this.isLoading = false;
    this.formValuesValid = null;
    this.errors = [];

    this.neighbor = this.route.snapshot.data['neighbor'];

    if (!this.neighbor) {
      this.router.navigate(['/vecinos']);
    }
  }

  public receiveFormValuesValid($event) {
    this.formValuesValid = $event;
  }

  updateNeighbor() {
    if (!this.formValuesValid) {
      console.log('El vecino no puede ser procesado porque es null');
    } else {
      this.isLoading = true;

      const neighborModel = new NeighborModel(this.formValuesValid);
      console.log(neighborModel);

      this.neighborService
        .updateNeighbor(neighborModel)
        .pipe(
          take(1),
          catchError(err => {
            this.errors = Object.values(err.errors);
            console.log(this.errors);
            return of(err);
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe(res => {
          if (res.status === 1) {
            this.router.navigate(['/vecinos']);
          }
        });
    }
  }

  close(i) {
    this.errors.splice(i, 1);
  }
}
