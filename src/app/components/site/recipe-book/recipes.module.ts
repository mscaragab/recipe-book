import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material.module';

import { SharedModule } from '../shared/shared.module';
import { ShortenPipe } from '../shared/shorten.pipe';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-list/recipe-start/recipe-start.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { recipeReducer } from './store/recipe.reducer';

@NgModule({
  declarations: [
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature('recipe', recipeReducer),
  ],
})
export class RecipesModule {}
