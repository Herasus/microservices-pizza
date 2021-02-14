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
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
    imports: [
        CommonModule,
        OrderRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialFileInputModule,
        MatIconModule,
        MatSelectModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
    ],
    declarations: [OrderListComponent, OrderEditComponent]
})
export class OrderModule { }
