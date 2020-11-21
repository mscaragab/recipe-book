import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../../../store/app.reducer';
@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
})
export class ShoppingItemComponent implements OnInit {
  @Input() ingredient: Ingredient;
  @Input() index: number;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {}

  onEdit() {
    this.store.dispatch(new ShoppingListActions.StartEdit(this.index));
  }
}
