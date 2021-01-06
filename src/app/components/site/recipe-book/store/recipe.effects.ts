import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import * as Auth from '../../auth/store/auth.actions';
import { getRecipes } from './recipe.reducer';

@Injectable({ providedIn: 'root' })
export class RecipeEffects {
  @Effect({ dispatch: false })
  saveRecipes = this.actions$.pipe(
    ofType(RecipeActions.SAVE_RECIPES),
    tap((recipeData: RecipeActions.SaveRecipes) => {
      // this.http
      //   .put(
      //     'https://ng-guide-1473a.firebaseio.com/recipes.json',
      //     recipeData.payload
      //   )
      //   .pipe(take(1))
      //   .subscribe();
    })
  );

  @Effect()
  loadRecipesStart = this.actions$.pipe(
    ofType(RecipeActions.LOAD_RECIPES_START),
    switchMap((recipesData: RecipeActions.LoadRecipesStart) => {
      return (
        // this.http
        // .get<Recipe[]>('https://ng-guide-1473a.firebaseio.com/recipes.json')
        // .get<Recipe[]>('https://recipes-48a2.restdb.io/rest/posts')
        this.getRecipes().pipe(
          map((resData) => {
            return new RecipeActions.LoadRecipesSuccess(resData);
          }),
          catchError((errorRes) => {
            return of(new RecipeActions.LoadRecipesFail(errorRes));
          })
        )
      );
    })
  );

  private getRecipes(): Observable<Recipe[]> {
    const observable = new Observable<Recipe[]>((observer) => {
      const details =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aperiam optio omnis dicta ipsa nobis minus corporis ut dolor alias molestiae, non quis iure rem cum sit magnam praesentium fugiat modi impedit in! Quo ad sit libero dolor eaque quas, quibusdam repellat sint, optio accusantium nulla facilis asperiores fuga adipisci. Veritatis quos omnis error mollitia nobis harum, similique libero quidem nihil enim amet voluptatem consequuntur pariatur? Facilis perspiciatis odit saepe illum maiores nulla cupiditate repudiandae sint. Dolorem voluptatum ex nisi distinctio fugiat sit obcaecati quo nulla facilis, earum velit. Aperiam provident delectus hic quibusdam laborum non veniam, est optio quia perferendis repudiandae temporibus id natus sunt! Laudantium atque vero dolore quasi molestiae, saepe adipisci placeat molestias. Ut quibusdam eos, odio accusantium temporibus magnam maiores similique. Dolore cupiditate recusandae laborum assumenda praesentium totam nesciunt, enim iusto ducimus sunt voluptatum, voluptates reprehenderit, necessitatibus odit itaque voluptas aperiam quas doloribus nihil corporis? Necessitatibus dolorem atque ut reiciendis. Commodi ducimus iste eius quibusdam explicabo dicta animi hic qui unde temporibus enim architecto, repellendus dolorum dolores quam dolorem perspiciatis magnam non consequatur laudantium culpa dolor? Blanditiis illo voluptas dolores in exercitationem doloribus necessitatibus aspernatur accusamus, earum cum deleniti quas eveniet error sunt iusto beatae animi temporibus.';

      const recipes = [
        {
          description: 'Grilled Chicken with Vegetables.',
          details: details,
          imagePath:
            'https://us.123rf.com/450wm/gbh007/gbh0071304/gbh007130400227/19108392-cuisse-de-poulet-grill%C3%A9-avec-des-l%C3%A9gumes.jpg?ver=6',
          ingredients: [
            {
              amount: 5,
              name: 'Chicken',
            },
            {
              amount: 10,
              name: 'Vegetables',
            },
          ],
          name: 'Grilled Chicken',
        },
        {
          description: 'Delicious Well Cooked Grilled Steak With French Fires.',
          details: details,
          imagePath:
            'https://previews.123rf.com/images/nitr/nitr1302/nitr130200048/18032406-grilled-steak-with-french-fries.jpg',
          ingredients: [
            {
              amount: 2,
              name: 'Steak',
            },
            {
              amount: 10,
              name: 'Fries',
            },
          ],
          name: 'Grilled Steak with French Fries',
        },
        {
          description: 'Tasty Spaghetti Bolognese.',
          details: details,
          imagePath:
            'https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-tall-FS-0204.jpg',
          ingredients: [
            {
              amount: 20,
              name: 'Spaghetti',
            },
            {
              amount: 50,
              name: 'Bolognese',
            },
          ],
          name: 'Spaghetti Bolognese',
        },
        {
          description: 'Best Shakshuka Recipe.',
          details: details,
          imagePath:
            'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
          ingredients: [
            {
              amount: 6,
              name: 'Eggs',
            },
            {
              amount: 5,
              name: 'Tomatoes',
            },
          ],
          name: 'Shakshuka',
        },
        {
          description: 'Fried Rice Recipe.',
          details: details,
          imagePath:
            'https://www.jessicagavin.com/wp-content/uploads/2018/09/fried-rice-8-1200.jpg',
          ingredients: [
            {
              amount: 5,
              name: 'Rice',
            },
            {
              amount: 10,
              name: 'Vegetables',
            },
            {
              amount: 1,
              name: 'Garlic',
            },
            {
              amount: 10,
              name: 'Peas',
            },
            {
              amount: 2,
              name: 'Carrot',
            },
          ],
          name: 'Fried Rice',
        },
      ];

      setTimeout(() => {
        observer.next(recipes);
      }, 1500);
    });
    return observable;
  }

  // @Effect()
  // loadRecipesSuccess = this.actions$.pipe(
  //   ofType(RecipeActions.LOAD_RECIPES_SUCCESS),
  //   switchMap((recipesData: RecipeActions.LoadRecipesSuccess) => {
  //     return of();
  //   })
  // );

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
    tap((editCancel: RecipeActions.EditCancel) => {
      if (isNaN(editCancel.payload)) {
        this.router.navigate(['/recipe']);
      } else {
        this.router.navigate(['/recipe/', editCancel.payload]);
      }
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
