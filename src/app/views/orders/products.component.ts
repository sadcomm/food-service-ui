import { Component, OnInit } from '@angular/core';
import { QueryOptions } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IProduct } from './orders-store/types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: IProduct[] = [];

  constructor(private _apollo: Apollo) {}

  get apollo() {
    return this._apollo.use('fsStore');
  }

  ngOnInit(): void {
    setTimeout(() => {
      const qo: QueryOptions = {
        query: gql`
          query MyQuery {
            product {
              id
              name
              price
              summary
              discount
              description
            }
          }
        `,
        fetchPolicy: 'no-cache',
      };
      this.apollo.query<{ product: IProduct[] }>(qo).subscribe(({ data }) => {
        this.products = data.product;
        console.log(this.products);
      });
    }, 1000);
  }
}
