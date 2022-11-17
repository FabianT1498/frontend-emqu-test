import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ServerComponent } from './page/server.component';
// import { CreatePaymentComponent } from './page/create/create-payment.component';
// import { UpdatePaymentComponent } from './page/update/update-payment.component';
// import { MonthlyPaymentsSelectComponent } from './component/monthly-payments-select/monthly-payments-select.component';
// import { RepairsSelectComponent } from './component/repairs-select/repairs-select.component';
// import { ContributionsSelectComponent } from './component/contributions-select/contributions-select.component';
// import { PaymentSummaryTableComponent } from './component/payment-summary-table/payment-summary-table.component';
// import { PaymentFormComponent } from './component/payment-form/payment-form.component';

import { ServerRoutingModule } from './server.routing';

@NgModule({
  declarations: [
    ServerComponent,
    // CreatePaymentComponent,
    // UpdatePaymentComponent,
    // MonthlyPaymentsSelectComponent,
    // RepairsSelectComponent,
    // ContributionsSelectComponent,
    // PaymentSummaryTableComponent,
    // PaymentFormComponent
  ],
  imports: [SharedModule, ServerRoutingModule],
  exports: [],
  providers: []
})
export class ServerModule {}
