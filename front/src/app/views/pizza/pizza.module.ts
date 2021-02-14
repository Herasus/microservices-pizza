import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PizzaRoutingModule } from './pizza-routing.module';
import { PizzaComponent } from './pizza/pizza.component';
import { PizzasComponent } from './pizzas/pizzas.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PizzaRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgbModule
  ],
  exports: [
  ],
  declarations: [PizzaComponent, PizzasComponent]
})
export class PizzaModule {
  constructor() {
  }
}
