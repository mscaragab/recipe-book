import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';

@Injectable()
export class RecipeEffects {
  @Effect({ dispatch: false })
  saveRecipes = this.actions$.pipe(
    ofType(RecipeActions.SAVE_RECIPES),
    tap((recipeData: RecipeActions.SaveRecipes) => {
      this.http.put(
        'https://ng-guide-1473a.firebaseio.com/recipes.json',
        recipeData.payload
      );
    })
  );

  
  @Effect()
  loadRecipesStart = this.actions$.pipe(
    ofType(RecipeActions.LOAD_RECIPES_START),
    switchMap((recipesData: RecipeActions.LoadRecipesStart) => {
      return this.http
        .get<Recipe[]>('https://ng-guide-1473a.firebaseio.com/recipes.json')
        .pipe(
          map((resData) => {
            return new RecipeActions.LoadRecipesSuccess(resData);
          }),
          catchError((errorRes) => {
            console.log('Load Recipes Error: ', errorRes);
            return of(new RecipeActions.LoadRecipesFail(errorRes));
          })
        );
    })
  );

  // @Effect()
  // updateRecipe = this.actions$.pipe(
  //   ofType(RecipeActions.UPDATE_RECIPE),
  //   switchMap((recipeData: RecipeActions.UpdateRecipe) => {
  //     return of(new RecipeActions.LoadRecipesStart());
  //   })
  // );

  @Effect({ dispatch: false })
  editCancelled = this.actions$.pipe(
    ofType(RecipeActions.EDIT_CANCEL),
    tap(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  );

  @Effect({ dispatch: false })
  deleteRecipe = this.actions$.pipe(
    ofType(RecipeActions.DELETE_RECIPE),
    tap(() => {
      this.router.navigate(['/recipe']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
