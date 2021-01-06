import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Recipe } from '../../recipe.model';
import { LoadRecipeDetailStart } from '../../store/recipe.actions';
import { AppState } from '../../store/recipe.reducer';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onLoadRecipeDetail() {
    this.store.dispatch(new LoadRecipeDetailStart());
  }
}
