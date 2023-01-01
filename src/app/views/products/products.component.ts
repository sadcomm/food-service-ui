import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ProductsStore } from './products-store/products-store';
import { Product } from './products-store/products-types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsStore],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public selectedProduct: Product | null = null;

  public products: Product[] = [];

  public loading$ = this._store.loading$;

  public items: MenuItem[] = [
    {
      label: 'View',
      icon: 'pi pi-fw pi-search',
      command: () => this.viewProduct(this.selectedProduct),
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      command: () => this.editProduct(this.selectedProduct),
    },
    {
      separator: true,
    },
    {
      label: 'Delete',
      icon: 'pi pi-fw pi-times',
      command: () => this.deleteProduct(this.selectedProduct),
    },
  ];

  constructor(
    private _store: ProductsStore,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._store.loadProducts();
  }

  ngOnInit(): void {
    this.subOnProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subOnProducts(): void {
    this._store.products$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products) => {
        this.products = products;
      });
  }

  private viewProduct(product: Product | null): void {
    if (product) {
      this._router.navigate(['./view', product.id], {
        relativeTo: this._activatedRoute,
      });
    }
  }

  private editProduct(product: Product | null): void {
    if (product) {
      this._router.navigate(['./edit', product.id], {
        relativeTo: this._activatedRoute,
      });
    }
  }

  private deleteProduct(product: Product | null): void {
    console.log('🚀 ~ deleteProduct ~ product', product);
  }
}
