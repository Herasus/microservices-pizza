import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IngredientListComponent} from './ingredient-list/ingredient-list.component';
import {IngredientCreateComponent} from './ingredient-create/ingredient-create.component';
import {IngredientEditComponent} from './ingredient-edit/ingredient-edit.component';

const routes: Routes = [
    {
        path: '',
        component: IngredientListComponent,
    },
    {
        path: 'create',
        component: IngredientCreateComponent
    },
    {
        path: 'edit/:id',
        component: IngredientEditComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IngredientRoutingModule { }
