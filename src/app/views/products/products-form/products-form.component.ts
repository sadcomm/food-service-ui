import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { FORM_STATE } from '../products-store/products-schema';
import { ProductsStore } from '../products-store/products-store';
import { Product } from '../products-store/products-types';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  public productFg = this._fb.group(new Product());

  public readonlyFg = false;

  constructor(
    private _store: ProductsStore,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sunOnActivatedRoute();
    this.subOnProduct();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private sunOnActivatedRoute(): void {
    this._activatedRoute.data.subscribe(({ title }) => {
      if (title === FORM_STATE.VIEW) {
        this.readonlyFg = true;
      }
    });
    this._activatedRoute.params
      .pipe(
        filter(({ id }) => !!id),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(({ id }) => {
        this._store.loadProductById({ id: id });
      });
  }

  private subOnProduct(): void {
    this._store.product$
      .pipe(
        filter((product: Product) => !Product.isNull(product.id)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((product: Product) => {
        this.productFg.patchValue(product);
      });
  }
}
