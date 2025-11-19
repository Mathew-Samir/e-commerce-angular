import { NotFound } from './feature/layout/not-found/not-found';
import { Routes } from '@angular/router';
import { Home } from './feature/pages/home/home';
import { Cart } from './feature/pages/cart/cart';
import { Categories } from './feature/pages/categories/categories';
import { Brands } from './feature/pages/brands/brands';
import { Products } from './feature/pages/products/products';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cart', component: Cart },
  { path: 'categories', component: Categories },
  { path: 'brands', component: Brands },
  { path: 'products', component: Products },
  { path: '**', component: NotFound },
];
