import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { DataStorageService } from '../../../shared/data-storage.service';
import { RecipeBookService } from '../../recipe-book.service';
import { Recipe } from '../../recipe.model';
import * as fromApp from '../../../../../store/app.reducer';
import * as fromRecipe from '../../store/recipe.reducer';
import * as Recipes from '../../store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeBookService,
    private store: Store<fromApp.AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const promise = new Promise<Recipe[]>((resolve, reject) => {
      this.store
        .select(fromRecipe.getRecipes)
        .pipe(take(1))
        .subscribe((recipes: Recipe[]) => {
          if (recipes && recipes.length > 0) {
            resolve(recipes);
          } else {
            this.store.dispatch(new Recipes.LoadRecipesStart());
            let sub: Subscription = this.store
              .select(fromRecipe.getRecipes)
              // .pipe(take(1))
              .subscribe((recipes: Recipe[]) => {
                if(recipes && recipes.length > 0) {
                  sub.unsubscribe();
                  resolve(recipes);
                }
              });
          }
        });
    });
    return promise;
  }
}
