import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/dashboard/dashboard').then(m => m.Dashboard),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./feature/home/home').then(m => m.Home)
      },
      {
        path: 'cart',
        loadComponent: () => import('./feature/cart/cart').then(m => m.Cart)
      },
      {
        path: 'categories',
        loadComponent: () => import('./feature/categories/categories').then(m => m.Categories)
      },
      {
        path: 'brands',
        loadComponent: () => import('./feature/brands/brands').then(m => m.Brands)
      },
      {
        path: 'products',
        loadComponent: () => import('./feature/products/products').then(m => m.Products)
      },
    ],
  },

  {
    path: 'auth',
    loadComponent: () => import('./layout/auth/auth').then(m => m.Auth),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('./layout/auth/components/login/login').then(m => m.Login)
      },
      {
        path: 'signup',
        loadComponent: () => import('./layout/auth/components/signup/signup').then(m => m.Signup)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./layout/auth/components/reset-password/reset-password').then(m => m.ResetPassword)
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./layout/not-found/not-found').then(m => m.NotFound)
  },
];
