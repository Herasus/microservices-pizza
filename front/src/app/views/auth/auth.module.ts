import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgbModule
  ],
  exports: [
  ],
  declarations: [LoginComponent, RegisterComponent, ProfileComponent]
})
export class AuthModule {
  constructor() {
  }
}
