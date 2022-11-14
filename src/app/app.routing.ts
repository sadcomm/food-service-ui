import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './views/orders/orders.component';

export const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: '**',
    redirectTo: 'orders',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
