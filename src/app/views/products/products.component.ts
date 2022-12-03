import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsStore } from './products-store/products-store';
import { IProduct } from './products-store/types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  private readonly unsubscribe$ = new Subject<void>();
  public products: IProduct[] = [];

  constructor(private _store: ProductsStore) {
    this._store.loadProducts();
  }

  ngOnInit(): void {
    this.subOnProducts();
  }

  private subOnProducts(): void {
    this._store.products$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products) => {
        this.products = products;
      });
  }
}
