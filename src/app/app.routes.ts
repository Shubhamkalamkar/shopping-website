import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/product-list/product-list.component').then(
            (c) => c.ProductListComponent
          ),
      },
      {
        path: '**', redirectTo: 'products'
      }
    ]
  },
  
];
