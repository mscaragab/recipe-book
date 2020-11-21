import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from '../shared/alert/alert.component';
import { ColorDirective } from '../shared/color.directive';
import { DropdownDirective } from '../shared/dropdown.directive';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    ColorDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    ColorDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ]
})
export class SharedModule {

}
