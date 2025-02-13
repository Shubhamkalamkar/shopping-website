import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./categories-list/categories-list.component').then(m => m.CategoriesListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./category-detail/category-detail.component').then(m => m.CategoryDetailComponent)
  }
];
