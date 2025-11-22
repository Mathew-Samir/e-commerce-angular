import { NotFound } from './layout/not-found/not-found';
import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Cart } from './feature/cart/cart';
import { Categories } from './feature/categories/categories';
import { Brands } from './feature/brands/brands';
import { Products } from './feature/products/products';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cart', component: Cart },
  { path: 'categories', component: Categories },
  { path: 'brands', component: Brands },
  { path: 'products', component: Products },
  { path: '**', component: NotFound },
];
