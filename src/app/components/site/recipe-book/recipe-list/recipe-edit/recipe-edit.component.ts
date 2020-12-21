import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

// import { RecipeBookService } from '../../recipe-book.service';
import { Recipe } from '../../recipe.model';
import * as RecipeActions from '../../store/recipe.actions';
import * as fromRecipe from '../../store/recipe.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editMode = false;

  recipe: Recipe;

  index: number;

  form: FormGroup;

  controls;

  constructor(
    private route: ActivatedRoute,
    // private recipeService: RecipeBookService,
    private router: Router,
    private store: Store<fromRecipe.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.index = +id;
      if (id != null) {
        this.editMode = true;
        this.store
          .select(fromRecipe.getRecipes)
          .pipe(take(1))
          .subscribe((recipes) => {
            this.recipe = recipes[id];
          });
        // this.recipe = this.recipeService.getRecipe(id);
        this.store.dispatch(new RecipeActions.EditStart(id));
      } else {
        this.recipe = null;
      }
      this.initForm();
    });
  }

  initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      if (this.recipe['ingredients']) {
        for (let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.form = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
    this.controls = (<FormArray>this.form.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe(this.form.value));
      // this.recipeService.updateRecipe(this.index, this.form.value);
    } else {
      // this.recipeService.addRecipe(this.form.value);
      this.store.dispatch(new RecipeActions.AddRecipe(this.form.value));
    }
    this.onCancel();
  }

  onCancel() {
    let index = this.index;
    if (!index) {
      index = -1;
    }
    this.store.dispatch(new RecipeActions.EditCancel(this.index));
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }
}
