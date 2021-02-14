import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaComponent } from './pizza/pizza.component';
import { PizzasComponent } from './pizzas/pizzas.component';

const routes: Routes = [
  {
    path: '',
    component: PizzasComponent
  },
  {
    path: ':pizza',
    component: PizzaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizzaRoutingModule {
  constructor() {
  }
}
