import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { CartComponent } from './cart/cart.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgbModule
  ],
  exports: [
  ],
  declarations: [CartComponent]
})
export class OrderModule {
  constructor() {
  }
}
