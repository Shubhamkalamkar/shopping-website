import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DealsComponent } from './features/deals/deals.component';
import { NewArrivalsComponent } from './features/new-arrivals/new-arrivals.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { WishlistComponent } from './features/user/wishlist/wishlist.component';
import { SettingsComponent } from './features/user/settings/settings.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes').then(m => m.productsRoutes)
  },
  {
    path: 'categories',
    loadChildren: () => import('./features/categories/categories.routes').then(m => m.categoriesRoutes)
  },
  {
    path: 'deals',
    component: DealsComponent
  },
  {
    path: 'new-arrivals',
    component: NewArrivalsComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.routes').then(m => m.userRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
