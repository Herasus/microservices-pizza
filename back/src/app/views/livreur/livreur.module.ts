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
import { LivreurCreateComponent } from './livreur-create/livreur-create.component';
import { LivreurEditComponent } from './livreur-edit/livreur-edit.component';
import { LivreurListComponent } from './livreur-list/livreur-list.component';
import { LivreurRoutingModule } from './livreur-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LivreurRoutingModule,
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
    declarations: [LivreurListComponent, LivreurCreateComponent, LivreurEditComponent]
})
export class LivreurModule { }
