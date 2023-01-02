import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MutationOptions, QueryOptions } from '@apollo/client/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Apollo } from 'apollo-angular';
import { EMPTY, forkJoin, Observable, switchMap } from 'rxjs';
import { generateUpsertMutation } from 'src/app/utils/graphql-mutation.generator';
import {
  generateQuery,
  generateQueryById,
} from 'src/app/utils/graphql-query-generator';
import { productsStateFeatureKey } from '../products.module';
import { Product } from './products-types';

interface IProductsState {
  product: Product;
  products: Product[];
  loading: boolean;
}

const productsState: IProductsState = {
  product: new Product(),
  products: [],
  loading: false,
};

@Injectable({ providedIn: 'platform' })
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
  public readonly loading$ = this.select(({ loading }) => loading);

  /* updaters */

  public readonly setProduct = this.updater((state, product: Product) => ({
    ...state,
    product: new Product(product),
  }));

  public readonly setProducts = this.updater((state, products: Product[]) => ({
    ...state,
    products: products,
  }));

  public readonly setLoading = this.updater((store, loading: boolean) => ({
    ...store,
    loading,
  }));

  constructor(
    private _snack: MatSnackBar,
    private _apollo: Apollo,
    private _http: HttpClient
  ) {
    super(productsState);
  }

  public readonly loadProducts = this.effect((event$: Observable<void>) =>
    event$.pipe(
      switchMap(() => {
        this.setLoading(true);
        const qo: QueryOptions = {
          query: generateQuery('product', [
            'id',
            'name',
            'price',
            'imgs',
            'discount',
            'summary',
            'description',
            'category_id',
            // { relName: 'product_category', relFields: ['name'] },
          ]),
          fetchPolicy: 'no-cache',
        };
        return this.apollo.query<{ product: Product[] }>(qo).pipe(
          tapResponse(
            ({ data }) => {
              this.setProducts(data.product);
              this.setLoading(false);
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
          this.setLoading(true);
          const qo: QueryOptions = {
            query: generateQueryById('product', [
              'id',
              'name',
              'price',
              'imgs',
              'discount',
              'summary',
              'description',
              'category_id',
              // { relName: 'product_category', relFields: ['name'] },
            ]),
            variables: {
              id: id,
            },
            fetchPolicy: 'no-cache',
          };
          return this.apollo.query<{ product_by_pk: Product }>(qo).pipe(
            tapResponse(
              ({ data }) => {
                this.setProduct(data.product_by_pk);
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

  public readonly getImages = (imgsPath: string[]) => {
    const imgsPathQueries: Observable<any>[] = [];
    for (const ip of imgsPath) {
      imgsPathQueries.push(
        this._http.get(`/fileService/${ip}`, {
          withCredentials: true,
          responseType: 'blob',
        })
      );
    }
    return forkJoin(imgsPathQueries);
  };

  public readonly upsertProduct = this.effect(
    (event$: Observable<{ product: Product; files: File[] }>) =>
      event$.pipe(
        switchMap(({ product, files }) => {
          this.setLoading(true);
          const data = new FormData();
          for (const file of files) {
            data.append('key', file);
          }
          return this._http
            .post<{ success: boolean; value: any }>(
              '/fileService/upload?key=gjkd75893',
              data
            )
            .pipe(
              switchMap(({ success, value }) => {
                if (success) {
                  product.imgs = JSON.stringify(
                    value.map((val: any) => val.filepath)
                  );
                } else {
                  product.imgs = null;
                }
                const mo: MutationOptions<{
                  insert_product: { returning: Product[] };
                }> = {
                  mutation: generateUpsertMutation('product', [
                    'id',
                    'name',
                    'price',
                    'imgs',
                    'discount',
                    'summary',
                    'description',
                    'category_id',
                    // { relName: 'product_category', relFields: ['name'] },
                  ]),
                  fetchPolicy: 'no-cache',
                  variables: {
                    objects: {
                      ...product,
                      id: product.id ?? undefined,
                    },
                    onConflict: {
                      constraint: 'product_pkey',
                      update_columns: [
                        'name',
                        'price',
                        'imgs',
                        'discount',
                        'summary',
                        'description',
                        'category_id',
                      ],
                    },
                  },
                };
                return this.apollo
                  .mutate<{ insert_product: { returning: Product[] } }>(mo)
                  .pipe(
                    tapResponse(
                      () => {
                        this.onSuccess('Продукт сохранен');
                        this.setLoading(false);
                      },
                      (error: { message: string }) => this.onError(error)
                    )
                  );
              })
            );
        })
      )
  );
}
