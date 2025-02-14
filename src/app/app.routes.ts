import { Routes } from '@angular/router';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/product-listing/product-listing.component').then(
            (c) => c.ProductListingComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
