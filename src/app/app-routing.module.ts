import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/site/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./components/site/shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'recipe',
    loadChildren: () =>
      import('./components/site/recipe-book/recipes.module').then(
        (m) => m.RecipesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
