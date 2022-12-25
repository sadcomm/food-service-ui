import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsFormComponent } from './products-form/products-form.component';
import { FORM_STATE } from './products-store/products-schema';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'new',
    component: ProductsFormComponent,
    data: {
      title: FORM_STATE.CREATE,
    },
  },
  {
    path: 'edit/:id',
    component: ProductsFormComponent,
    data: {
      title: FORM_STATE.EDIT,
    },
  },
  {
    path: 'view/:id',
    component: ProductsFormComponent,
    data: {
      title: FORM_STATE.VIEW,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
