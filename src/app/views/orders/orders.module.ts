import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { TableModule } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders.routing';

export const ordersStateFeatureKey = 'ordersStore';

const middlewareLink = new ApolloLink((op, forward) =>
  forward(op).map((response) => response)
);

@NgModule({
  declarations: [OrdersComponent],
  imports: [ApolloModule, MatToolbarModule, TableModule, OrdersRoutingModule],
  providers: [],
})
export class OrdersModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.createNamed(ordersStateFeatureKey, {
      link: middlewareLink.concat(
        httpLink.create({
          uri: environment.api.hasura,
        })
      ),
      cache: new InMemoryCache(),
    });
  }
}
