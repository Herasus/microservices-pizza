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
import { PizzaCreateComponent } from './pizza-create/pizza-create.component';
import { PizzaEditComponent } from './pizza-edit/pizza-edit.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaRoutingModule } from './pizza-routing.module';

@NgModule({
    imports: [
        CommonModule,
        PizzaRoutingModule,
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
    declarations: [PizzaListComponent, PizzaCreateComponent, PizzaEditComponent]
})
export class PizzaModule { }
