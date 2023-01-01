import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { FORM_STATE } from '../products-store/products-schema';
import { ProductsStore } from '../products-store/products-store';
import { Product } from '../products-store/products-types';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
  providers: [ProductsStore],
})
export class ProductsFormComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  public productFg = this._fb.group(new Product());

  public readonlyFg = false;

  public uploadedFiles: File[] = [];

  public loadedFile: any = null;

  constructor(
    private _store: ProductsStore,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sunOnActivatedRoute();
    this.subOnProduct();
    this.clearForm();
    this.applyValidators();
  }

  ngOnDestroy(): void {
    this.uploadedFiles = [];
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public isDirty = (): boolean => this.productFg.dirty && this.productFg.valid;

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
        if (product.imgs) {
          const imgPaths = JSON.parse(product.imgs);
          this._store
            .getImages(imgPaths)
            .pipe(take(1))
            .subscribe((response) => {
              this.uploadedFiles = response.map((blob, idx) =>
                this.blobToFile(blob, imgPaths[idx])
              );
            });
        }
      });
  }

  private blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;

    b.lastModifiedDate = new Date();
    b.name = fileName;

    return <File>theBlob;
  };

  private applyValidators(): void {
    for (const controlName of ['category_id', 'name', 'price']) {
      this.productFg.get(controlName)?.setValidators([Validators.required]);
    }
  }

  private clearForm(): void {
    this.productFg.reset();
    this.uploadedFiles = [];
  }

  public onSelect(event: any) {
    this.productFg.markAsDirty();
    this.uploadedFiles = [...event.currentFiles];
  }

  public onRemove(event: any): void {
    this.productFg.markAsDirty();
    this.uploadedFiles = this.uploadedFiles.filter(
      (uploadedFile) => uploadedFile.name !== event.file.name
    );
  }

  public onClear(): void {
    this.productFg.markAsDirty();
    this.uploadedFiles = [];
  }

  public onSubmit(): void {
    this._store.upsertProduct({
      product: this.productFg.getRawValue(),
      files: this.uploadedFiles,
    });
  }
}
