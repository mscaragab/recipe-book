import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducer';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  selectedRecipe: Recipe;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRecipe.AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recipes$ = this.store.select(fromRecipe.getRecipes);
  }

  onNew() {
    let width = '60vw';
    let height = '60vh';
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      width = '90vw';
      height = '90vh';
    }
    let dialogRef = this.dialog.open(RecipeEditComponent, {
      data: { id: null },
      minHeight: height,
      minWidth: width,
    });
  }
}
