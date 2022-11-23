import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<mat-sidenav-container class="sidenav-container">
    <mat-sidenav
      role="navigation"
      class="sidenav-navigation"
      mode="side"
      opened="true"
    >
      <mat-toolbar color="primary" class="sidenav-toolbar mat-elevation-z2">
        <div
          class="sidenav-toolbar-title-container"
          fxLayout="row"
          fxLayoutAlign="space-between center"
        >
          <div fxLayoutAlign="start center" fxLayoutGap="0.25em">
            <img src="/assets/favicon.ico" />
            <span class="sidenav-toolbar-title mat-typography-headline5">
              Food Service
            </span>
          </div>
          <button class="sidenav-toolbar-button" mat-icon-button>
            <mat-icon>menu</mat-icon>
          </button>
        </div>
      </mat-toolbar>
      <mat-nav-list class="sidenav-list bg-primary">
        <mat-list-item>
          <div fxLayoutAlign="start center" fxLayoutGap="0.25em">
            <mat-icon>format_list_bulleted</mat-icon>
            <span>Заказы</span>
          </div>
        </mat-list-item>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content role="main" class="sidenav-content">
      <section class="sidenav-main-section">
        <div class="mdc-layout-grid">
          <router-outlet></router-outlet>
        </div>
      </section>
    </mat-sidenav-content>
  </mat-sidenav-container>`,
  styles: [
    `
      .sidenav-container {
        height: 100%;

        .sidenav-navigation {
          width: 270px;
          user-select: none;

          .sidenav-toolbar {
            position: absolute;
            height: 48px;
            padding-right: 8px;

            .sidenav-toolbar-title-container {
              width: 100%;
              .sidenav-toolbar-title {
                font-size: 16px;
              }
            }
          }

          .sidenav-list {
            height: calc(100% - 48px);
            margin-top: 48px;
            padding-top: 0;
            mat-list-item {
              color: white;
            }
          }
        }

        .sidenav-content {
          .sidenav-main-section {
            -ms-flex: 1;
            flex: 1;
            width: 100%;
            margin-top: 48px;
            height: calc(100vh - 48px);
            padding: 12px;
            overflow-y: auto;
            & > .mdc-layout-grid {
              height: 100%;
              padding: 0;
            }
          }
        }
      }
    `,
  ],
})
export class AppComponent {
  public onRouterOutletActivate(event: any) {
    console.log(event);
  }
}
