import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const EDIT_START = '[Recipe] Edit Start';
export const EDIT_CANCEL = '[Recipe] Edit Cancel';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const SAVE_RECIPES = '[Recipe] Save Recipes';
export const LOAD_RECIPES_START = '[Recipe] Load Recipes Start';
export const LOAD_RECIPES_SUCCESS = '[Recipe] Load Recipes Success';
export const LOAD_RECIPES_FAIL = '[Recipe] Load Recipes Fail';

export class EditStart implements Action {
  readonly type = EDIT_START;

  constructor(public payload: number) {}
}

export class EditCancel implements Action {
  readonly type = EDIT_CANCEL;
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: Recipe) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class SaveRecipes implements Action {
  readonly type = SAVE_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class LoadRecipesStart implements Action {
  readonly type = LOAD_RECIPES_START;
}

export class LoadRecipesSuccess implements Action {
  readonly type = LOAD_RECIPES_SUCCESS;

  constructor(public payload: Recipe[]) {}
}

export class LoadRecipesFail implements Action {
  readonly type = LOAD_RECIPES_FAIL;

  constructor(public payload: string) {}
}

export type RecipeActions =
  | EditStart
  | EditCancel
  | UpdateRecipe
  | AddRecipe
  | DeleteRecipe
  | SaveRecipes
  | LoadRecipesStart
  | LoadRecipesSuccess
  | LoadRecipesFail;
