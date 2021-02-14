import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {VehiculeListComponent} from './vehicule-list/vehicule-list.component';
import {VehiculeCreateComponent} from './vehicule-create/vehicule-create.component';
import {VehiculeEditComponent} from './vehicule-edit/vehicule-edit.component';

const routes: Routes = [
    {
        path: '',
        component: VehiculeListComponent,
    },
    {
        path: 'create',
        component: VehiculeCreateComponent,
    },
    {
        path: 'edit/:id',
        component: VehiculeEditComponent,
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehiculeRoutingModule { }
