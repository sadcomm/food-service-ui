import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryOptions } from '@apollo/client/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { productsStateFeatureKey } from '../products.module';
import { Product } from './products-types';

interface IProductsState {
  product: Product;
  products: Product[];
}

const productsState: IProductsState = {
  product: new Product(),
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

  public readonly product$ = this.select(({ product }) => product);
  public readonly products$ = this.select(({ products }) => products);

  /* updaters */

  public readonly setProduct = this.updater((state, product: Product) => ({
    ...state,
    product: new Product(product),
  }));

  public readonly setProducts = this.updater((state, products: Product[]) => ({
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
                imgs
                discount
                summary
                description
                category_id
              }
            }
          `,
          fetchPolicy: 'no-cache',
        };
        return this.apollo.query<{ product: Product[] }>(qo).pipe(
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

  public readonly loadProductById = this.effect(
    (event$: Observable<{ id: number }>) =>
      event$.pipe(
        switchMap(({ id }) => {
          const qo: QueryOptions = {
            query: gql`
              query MyQuery {
                product_by_pk(id: ${id}) {
                  id
                  name
                  price
                  imgs
                  discount
                  summary
                  description
                  category_id
                }
              }
            `,
            fetchPolicy: 'no-cache',
          };
          return this.apollo.query<{ product_by_pk: Product }>(qo).pipe(
            tapResponse(
              ({ data }) => {
                return this.setProduct(data.product_by_pk);
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
