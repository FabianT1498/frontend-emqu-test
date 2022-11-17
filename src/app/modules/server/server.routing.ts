import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CreatePaymentComponent } from './page/create/create-payment.component';
// import { UpdatePaymentComponent } from './page/update/update-payment.component';
import { ServerComponent } from './page/server.component';

import { ServerResolver } from './server.service';
// import { EditPaymentResolver } from './edit-payment-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ServerComponent,
    pathMatch: 'full',
    resolve: {
      serversCount: ServerResolver
    }
  },
  // {
  //   path: 'crear',
  //   component: CreatePaymentComponent
  // },
  // {
  //   path: ':id/editar',
  //   component: UpdatePaymentComponent,
  //   resolve: {
  //     paymentData: EditPaymentResolver
  //   }
  // }
  /*  {
    path: ':id',
    component: PaymentDetailComponent,
    resolve: {
      project: PaymentResolver
    }
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerRoutingModule {}
