import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ScToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { environment } from 'src/environments/environment';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products.routing';

export const productsStateFeatureKey = 'productsStore';

const middlewareLink = new ApolloLink((op, forward) =>
  forward(op).map((response) => response)
);

@NgModule({
  declarations: [ProductsComponent, ProductsFormComponent],
  imports: [
    ApolloModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    ButtonModule,
    CommonModule,
    TableModule,
    ProductsRoutingModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ScToolbarModule,
    ContextMenuModule,
    FlexModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    SkeletonModule,
  ],
  providers: [FormBuilder],
})
export class ProductsModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.createNamed(productsStateFeatureKey, {
      link: middlewareLink.concat(
        httpLink.create({
          uri: environment.api.hasura,
        })
      ),
      cache: new InMemoryCache(),
    });
  }
}
