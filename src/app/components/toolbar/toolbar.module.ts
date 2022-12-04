import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [MatToolbarModule],
  providers: [],
  exports: [ToolbarComponent],
})
export class ScToolbarModule {}
