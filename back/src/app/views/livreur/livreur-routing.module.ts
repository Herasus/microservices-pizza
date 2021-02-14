import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LivreurListComponent} from './livreur-list/livreur-list.component';
import {LivreurCreateComponent} from './livreur-create/livreur-create.component';
import {LivreurEditComponent} from './livreur-edit/livreur-edit.component';

const routes: Routes = [
    {
        path: '',
        component: LivreurListComponent,
    },
    {
        path: 'create',
        component: LivreurCreateComponent,
    },
    {
        path: 'edit/:id',
        component: LivreurEditComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LivreurRoutingModule { }
