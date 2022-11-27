import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentStore } from '@ngrx/component-store';
import { Subject } from 'rxjs';

interface IProductsState {
  products: any[];
}

const productsState: IProductsState = {
  products: [],
};

@Injectable({ providedIn: 'root' })
export class SearchStore extends ComponentStore<IProductsState> {
  private readonly unsubscribe$ = new Subject<void>();

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

  public readonly setFilterState = this.updater((state, products: any[]) => ({
    ...state,
    products: products,
  }));

  constructor(private _snack: MatSnackBar) {
    super(productsState);
  }

  // public readonly loadDocument = this.effect(
  //   (event$: Observable<{ doc: any; searchQuery: SearchValue }>) =>
  //     event$.pipe(
  //       switchMap(({ doc, searchQuery }) => {
  //         const { id, index, detailsPath }: SearchResultItem = doc;
  //         return this._http.get(detailsPath).pipe(
  //           map((res) => {
  //             this.sortClassifications(res, searchQuery);
  //             return { id, index, detailsPath, source: res };
  //           }),
  //           tapResponse(
  //             (result: any) => {
  //               this.setCurrentDoc(result);
  //             },
  //             (error: { message: string }) => {
  //               this.onError(error);
  //               return EMPTY;
  //             }
  //           )
  //         );
  //       })
  //     )
  // );
}
