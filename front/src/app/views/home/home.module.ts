import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgbModule
  ],
  exports: [
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
  constructor() {
  }
}
