import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './shared/components/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      },
      {
        path: '',
        loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'pizzas',
        loadChildren: () => import('./views/pizza/pizza.module').then(m => m.PizzaModule)
      },
      {
        path: '',
        loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
