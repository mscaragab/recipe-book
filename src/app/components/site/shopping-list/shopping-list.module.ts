import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material.module';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { ShoppingListComponent } from './shopping-list.component';
import { shoppingListReducer } from './store/shopping-list.reducer';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingItemComponent,
    ShoppingEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
    StoreModule.forFeature('shopping-list', shoppingListReducer),
  ],
})
export class ShoppingListModule {}
