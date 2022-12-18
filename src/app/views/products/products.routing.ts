import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsFormComponent } from './products-form/products-form.component';
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
      title: 'Создание',
    },
  },
  {
    path: 'edit/:id',
    component: ProductsFormComponent,
    data: {
      title: 'Редактирование',
    },
  },
  {
    path: 'view/:id',
    component: ProductsFormComponent,
    data: {
      title: 'Просмотр',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
