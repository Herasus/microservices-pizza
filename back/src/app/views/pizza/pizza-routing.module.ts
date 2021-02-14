import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PizzaListComponent} from './pizza-list/pizza-list.component';
import {PizzaCreateComponent} from './pizza-create/pizza-create.component';
import {PizzaEditComponent} from './pizza-edit/pizza-edit.component';

const routes: Routes = [
    {
        path: '',
        component: PizzaListComponent,
    },
    {
        path: 'create',
        component: PizzaCreateComponent,
    },
    {
        path: 'edit/:id',
        component: PizzaEditComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PizzaRoutingModule { }
