import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,


  MatFormFieldModule, MatInputModule,
  MatRippleModule,


  MatSelectModule, MatTooltipModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { LoginLayoutRoutes } from './login-layout.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
  ]
})

export class LoginLayoutModule {}
