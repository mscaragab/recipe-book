import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../../../store/app.reducer';

export interface AppState extends fromApp.AppState {
  recipe: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
  editRecipe: Recipe;
  editRecipeIndex: number;
  error: string;
  isLoading: boolean;
  startLoadingDetail: boolean;
  startUnloadingDetail: boolean;
  skipAnimation: boolean;
}

const initialState: RecipeState = {
  recipes: [],
  editRecipe: null,
  editRecipeIndex: -1,
  error: null,
  isLoading: false,
  startLoadingDetail: false,
  startUnloadingDetail: false,
  skipAnimation: false,
};

export function recipeReducer(
  state: RecipeState = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.EDIT_START:
      return {
        ...state,
        editRecipe: state.recipes.slice()[action.payload],
        editRecipeIndex: action.payload,
      };
    case RecipeActions.EDIT_CANCEL:
      return {
        ...state,
        editRecipe: null,
        editRecipeIndex: -1,
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes.slice()[state.editRecipeIndex];
      const updatedRecipe = {
        ...recipe,
        ...action.payload,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[state.editRecipeIndex] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes,
        recipe: null,
        editRecipeIndex: -1,
      };
    case RecipeActions.ADD_RECIPE:
      const recipes1 = state.recipes.slice();
      recipes1.push(action.payload);
      return {
        ...state,
        recipes: recipes1,
      };
    case RecipeActions.DELETE_RECIPE:
      const recipes2 = state.recipes.filter(
        (recipe, index) => index !== action.payload
      );
      return {
        ...state,
        recipes: recipes2,
      };
    case RecipeActions.SAVE_RECIPES:
      return {
        ...state,
      };
    case RecipeActions.LOAD_RECIPES_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case RecipeActions.LOAD_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.payload,
        error: null,
        isLoading: false,
      };
    case RecipeActions.LOAD_RECIPES_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case RecipeActions.LOAD_RECIPE_DETAIL_START:
      return {
        ...state,
        startLoadingDetail: true,
      };
    case RecipeActions.UNLOAD_RECIPE_DETAIL_START:
      return {
        ...state,
        startUnloadingDetail: true,
      };
    case RecipeActions.LOADING_RECIPE_DETAIL_COMPLETE:
      return {
        ...state,
        startLoadingDetail: false,
      };
    case RecipeActions.UNLOADING_RECIPE_DETAIL_COMPLETE:
      return {
        ...state,
        startUnloadingDetail: false,
      };
    case RecipeActions.SKIP_ANIMATION:
      return {
        ...state,
        skipAnimation: true,
      };
    case RecipeActions.RESET_SKIP_ANIMATION_FLAG:
      return {
        ...state,
        skipAnimation: false,
      };
    default:
      return state;
  }
}

const getRecipeState = createFeatureSelector<RecipeState>('recipe');
export const getRecipes = createSelector(
  getRecipeState,
  (state) => state.recipes
);
export const isLoading = createSelector(
  getRecipeState,
  (state) => state.isLoading
);
export const loadingDetailStart = createSelector(
  getRecipeState,
  (state) => state.startLoadingDetail
);
export const unloadingDetailStart = createSelector(
  getRecipeState,
  (state) => state.startUnloadingDetail
);
export const skipAnimationn = createSelector(
  getRecipeState,
  (state) => state.skipAnimation
);
