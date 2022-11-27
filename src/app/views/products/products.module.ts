import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { TableModule } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products.routing';

export const productsStateFeatureKey = 'productsStore';

const middlewareLink = new ApolloLink((op, forward) =>
  forward(op).map((response) => response)
);

@NgModule({
  declarations: [ProductsComponent],
  imports: [ApolloModule, MatToolbarModule, TableModule, ProductsRoutingModule],
  providers: [],
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
