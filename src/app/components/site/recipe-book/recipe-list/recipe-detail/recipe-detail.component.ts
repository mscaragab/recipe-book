import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Recipe } from '../../recipe.model';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddIngredients } from '../../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../../store/recipe.reducer';
import * as RecipeActions from '../../store/recipe.actions';

import { filter, first, take, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, AfterViewInit {
  recipe: Recipe;
  id: string;
  @ViewChild('container') containerElRef: ElementRef;

  constructor(
    private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private store: Store<fromRecipe.AppState>,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      // this.recipe = this.recipeBookService.getRecipe(params['id']);
      this.store
        .select(fromRecipe.getRecipes)
        // .pipe(take(1))
        .subscribe((recipes) => {
          this.recipe = recipes[this.id];
        });
    });

    window.scroll(0, 0);
  }

  ngAfterViewInit(): void {
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      if (this.containerElRef) {
        (<HTMLDivElement>this.containerElRef.nativeElement).classList.add(
          'slidein'
        );
      }
    }
  }

  onBack() {
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      if (this.containerElRef) {
        (<HTMLDivElement>this.containerElRef.nativeElement).classList.remove(
          'slidein'
        );
        (<HTMLDivElement>this.containerElRef.nativeElement).classList.add(
          'slideout'
        );
      }
    }
    let timeout = setTimeout(() => {
      clearTimeout(timeout);
      timeout = undefined;
      this.router.navigateByUrl('/recipe');
    }, 300);
  }

  onToShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
    let snackBarRef = this.snackbar.open('Sent to shopping list.', null, {
      verticalPosition: 'top',
      duration: 2000,
      panelClass: 'snackbar',
    });
  }

  onDelete() {
    // this.recipeBookService.deleteRecipe(+this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(+this.id));
  }

  onEdit() {
    let width = '60vw';
    let height = '60vh';
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      width = '90vw';
      height = '90vh';
    }
    let dialogRef = this.dialog.open(RecipeEditComponent, {
      data: { id: this.id },
      minHeight: height,
      minWidth: width,
    });
  }
}
