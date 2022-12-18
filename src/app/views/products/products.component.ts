import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
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

  public selectedProduct: IProduct | null = null;
  public products: IProduct[] = [];
  public items: MenuItem[] = [
    {
      label: 'Просмотр',
      icon: 'pi pi-fw pi-search',
      command: () => this.viewProduct(this.selectedProduct),
    },
    {
      label: 'Редактировать',
      icon: 'pi pi-fw pi-pencil',
      command: () => this.editProduct(this.selectedProduct),
    },
    {
      separator: true,
    },
    {
      label: 'Удалить',
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

  private subOnProducts(): void {
    this._store.products$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products) => {
        this.products = products;
      });
  }

  private viewProduct(product: IProduct | null): void {
    if (product) {
      this._router.navigate(['./view', product.id], {
        relativeTo: this._activatedRoute,
      });
    }
  }

  private editProduct(product: IProduct | null): void {}

  private deleteProduct(product: IProduct | null): void {}
}
