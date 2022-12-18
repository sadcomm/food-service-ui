import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.sunOnActivatedRoute();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private sunOnActivatedRoute(): void {
    this._activatedRoute.data.subscribe(console.log);
    this._activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        console.log('🚀 ~ .subscribe ~ params', params);
      });
  }
}
