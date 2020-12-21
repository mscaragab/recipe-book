import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../components/site/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../components/site/auth/store/auth.reducer';
import * as fromRecipe from '../components/site/recipe-book/store/recipe.reducer';

export interface AppState {
}

export const AppReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipe: fromRecipe.recipeReducer
};
