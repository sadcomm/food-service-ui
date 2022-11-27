import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersModule } from './views/orders/orders.module';
import { ProductsModule } from './views/products/products.module';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => ProductsModule,
  },
  {
    path: 'orders',
    loadChildren: () => OrdersModule,
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
