import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxMaskModule } from 'ngx-mask';

import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';

import {
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
  faUserCircle,
  faAsterisk,
  faHome,
  faUsers,
  faMoneyBillWave,
  faFileInvoiceDollar,
  faFileExcel,
  faWrench,
  faServer,
  faPlay
} from '@fortawesome/free-solid-svg-icons';

import { faMediumM, faGithub } from '@fortawesome/free-brands-svg-icons';

/** COMPONENTS */
import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { AlertComponent } from './component/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // NgbModule,
    FontAwesomeModule
  ],
  declarations: [ControlMessagesComponent, SpinnerComponent, AlertComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    MaterialModule,

    // NgbModule,
    FontAwesomeModule,

    ControlMessagesComponent,
    SpinnerComponent,
    AlertComponent,

    // NgxMaskModule
  ]
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faGithub,
      faMediumM,
      faPlus,
      faPlay,
      faEdit,
      faTrash,
      faTimes,
      faCaretUp,
      faCaretDown,
      faExclamationTriangle,
      faFilter,
      faTasks,
      faCheck,
      faSquare,
      faLanguage,
      faPaintBrush,
      faLightbulb,
      faWindowMaximize,
      faStream,
      faBook,
      faUserCircle,
      faAsterisk,
      faHome,
      faUsers,
      faMoneyBillWave,
      faFileInvoiceDollar,
      faFileExcel,
      faWrench,
      faServer
    );
  }
}
