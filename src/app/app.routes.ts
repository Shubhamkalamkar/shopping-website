import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home-page/home-page.component').then((c) => c.HomePageComponent),
      },
      {
        path: 'men',
        loadComponent: () =>
          import('./pages/category/category.component').then((c) => c.CategoryComponent),
        data: { category: 'men' }
      },
      {
        path: 'women',
        loadComponent: () =>
          import('./pages/category/category.component').then((c) => c.CategoryComponent),
        data: { category: 'women' }
      },
      {
        path: 'kids',
        loadComponent: () =>
          import('./pages/category/category.component').then((c) => c.CategoryComponent),
        data: { category: 'kids' }
      },
      {
        path: 'new-arrivals',
        loadComponent: () =>
          import('./pages/new-arrivals/new-arrivals.component').then((c) => c.NewArrivalsComponent),
      },
      {
        path: 'bestsellers',
        loadComponent: () =>
          import('./pages/bestsellers/bestsellers.component').then((c) => c.BestsellersComponent),
      },
      {
        path: 'sale',
        loadComponent: () =>
          import('./pages/sale/sale.component').then((c) => c.SaleComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then((c) => c.ProfileComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders/orders.component').then((c) => c.OrdersComponent),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then((c) => c.WishlistComponent),
      }
    ],
  },
];
