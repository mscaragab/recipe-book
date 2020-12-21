import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListComponent } from './shopping-list.component';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Ingredient } from '../shared/ingredient.model';
import { take } from 'rxjs/operators';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  // let store: MockStore;
  // const initialState = {
  //   ingredients: [new Ingredient('Tomato', 5)],
  // };

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ShoppingListComponent],
  //     providers: [provideMockStore({ initialState })],
  //   }).compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ShoppingListComponent);
  //   component = fixture.componentInstance;
  //   store = TestBed.inject(MockStore);
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should have ingredients', () => {
  //   expect(component.ingredients).toBeDefined();
  // });

  // it('should have tomato ingredient', async(() => {
  //   fixture.whenStable().then(() => {
  //     component.ingredients.pipe(take(1)).subscribe((ingredients) => {
  //       expect(ingredients).toHaveSize(1);
  //       expect(ingredients[0].name).toEqual('Tomato');
  //       expect(ingredients[0].amount).toEqual(5);
  //     });
  //   });
  // }));
});
