import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryOptions } from '@apollo/client/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { productsStateFeatureKey } from '../products.module';
import { IProduct } from './types';

interface IProductsState {
  products: IProduct[];
}

const productsState: IProductsState = {
  products: [],
};

@Injectable({ providedIn: 'root' })
export class ProductsStore extends ComponentStore<IProductsState> {
  get apollo() {
    return this._apollo.use(productsStateFeatureKey);
  }

  public onSuccess = (message: string): void => {
    this._snack.open(message, undefined, { duration: 3000 });
  };

  public onError = (e: any): void => {
    this._snack.open(e, undefined, { duration: 3000 });
    console.error(e);
  };

  /* selectors */

  public readonly products$ = this.select(({ products }) => products);

  /* updaters */

  public readonly setProducts = this.updater((state, products: IProduct[]) => ({
    ...state,
    products: products,
  }));

  constructor(private _snack: MatSnackBar, private _apollo: Apollo) {
    super(productsState);
  }

  public readonly loadProducts = this.effect((event$: Observable<void>) =>
    event$.pipe(
      switchMap(() => {
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
        return this.apollo.query<{ product: IProduct[] }>(qo).pipe(
          tapResponse(
            ({ data }) => {
              return this.setProducts(data.product);
            },
            (error: { message: string }) => {
              this.onError(error);
              return EMPTY;
            }
          )
        );
      })
    )
  );
}
