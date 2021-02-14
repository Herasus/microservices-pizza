import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatPaginatorModule,
    MatRippleModule,
    MatSelectModule, MatSortModule, MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
