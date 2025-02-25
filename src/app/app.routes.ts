import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'products/men',
        loadComponent: () =>
          import('./pages/product/men/men-product.component').then((c) => c.MenProductComponent),
      },
      {
        path: 'products/women',
        loadComponent: () =>
          import('./pages/product/women/women-product.component').then((c) => c.WomenProductComponent),
      },
      {
        path: 'products/kids',
        loadComponent: () =>
          import('./pages/product/kids/kids-product.component').then((c) => c.KidsProductComponent),
      },
      {
        path: 'products/accessories',
        loadComponent: () =>
          import('./pages/product/accessories/accessories-product.component').then((c) => c.AccessoriesProductComponent),
      },
      {
        path: 'products/gifting',
        loadComponent: () =>
          import('./pages/product/gifting/gifting-product.component').then((c) => c.GiftingProductComponent),
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ],
  },
];
