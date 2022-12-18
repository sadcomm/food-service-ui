import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ScToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { environment } from 'src/environments/environment';
import { ProductsStore } from './products-store/products-store';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products.routing';
import { ButtonModule } from 'primeng/button';
import { FlexModule } from '@angular/flex-layout';
import { ProductsFormComponent } from './products-form/products-form.component';

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
    ButtonModule,
    TableModule,
    ProductsRoutingModule,
    MatSnackBarModule,
    ScToolbarModule,
    ContextMenuModule,
    FlexModule,
  ],
  providers: [ProductsStore],
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
