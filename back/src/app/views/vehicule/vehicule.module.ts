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
import { VehiculeCreateComponent } from './vehicule-create/vehicule-create.component';
import { VehiculeEditComponent } from './vehicule-edit/vehicule-edit.component';
import { VehiculeListComponent } from './vehicule-list/vehicule-list.component';
import { VehiculeRoutingModule } from './vehicule-routing.module';

@NgModule({
    imports: [
        CommonModule,
        VehiculeRoutingModule,
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
    declarations: [VehiculeListComponent, VehiculeCreateComponent, VehiculeEditComponent]
})
export class VehiculeModule { }
