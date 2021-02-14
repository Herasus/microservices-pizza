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
import { IngredientCreateComponent } from './ingredient-create/ingredient-create.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientRoutingModule } from './ingredient-routing.module';

@NgModule({
    imports: [
        CommonModule,
        IngredientRoutingModule,
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
    declarations: [IngredientListComponent, IngredientCreateComponent, IngredientEditComponent]
})
export class IngredientModule { }
