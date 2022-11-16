import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
// import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NoAuthGuard } from '@app/guard/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    // component: ContentLayoutComponent,
    canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('@modules/home/home.module').then(m => m.HomeModule)
      // },
      // {
      //   path: 'pagos',
      //   loadChildren: () =>
      //     import('@modules/payment/payment.module').then(m => m.PaymentModule)
      // },
      // {
      //   path: 'reparaciones',
      //   loadChildren: () =>
      //     import('@modules/repair/repair.module').then(m => m.RepairModule)
      // },
      // {
      //   path: 'vecinos',
      //   loadChildren: () =>
      //     import('@modules/neighbor/neighbor.module').then(
      //       m => m.NeighborModule
      //     )
      // }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
