import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { ApolloLink } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './views/products/products.module';
import { OrdersModule } from './views/orders/orders.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const middlewareLink = new ApolloLink((op, forward) =>
  forward(op).map((response) => response)
);

const MATERIAL = [
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatDividerModule,
];

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    ...MATERIAL,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ProductsModule,
    OrdersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
