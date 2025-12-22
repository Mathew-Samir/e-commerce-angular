import { NotFound } from './layout/not-found/not-found';
import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Cart } from './feature/cart/cart';
import { Categories } from './feature/categories/categories';
import { Brands } from './feature/brands/brands';
import { Products } from './feature/products/products';
import { Auth } from './layout/auth/auth';
import { Dashboard } from './layout/dashboard/dashboard';
import { Signup } from './layout/auth/components/signup/signup';
import { Login } from './layout/auth/components/login/login';
import { ResetPassword } from './layout/auth/components/reset-password/reset-password';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: Home },
      { path: 'cart', component: Cart },
      { path: 'categories', component: Categories },
      { path: 'brands', component: Brands },
      { path: 'products', component: Products },
    ],
  },

  {
    path: 'auth',
    component: Auth,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      { path: 'login', component: Login },
      { path: 'signup', component: Signup },
      { path: 'reset-password', component: ResetPassword },
    ],
  },
  { path: '**', component: NotFound },
];
