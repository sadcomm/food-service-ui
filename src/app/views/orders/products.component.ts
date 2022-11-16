import { Component, OnInit } from '@angular/core';
import { QueryOptions } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private _apollo: Apollo) {}

  get apollo() {
    return this._apollo.use('fsStore');
  }

  ngOnInit(): void {
    setTimeout(() => {
      const qo: QueryOptions = {
        query: gql`
          query MyQuery {
            dic {
              id
              created_at
              name
              sign
            }
          }
        `,
        fetchPolicy: 'no-cache',
      };
      this.apollo.query<{ reg_article: any[] }>(qo).subscribe(console.log);
    }, 1000);
  }
}
