import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderEditComponent} from './order-edit/order-edit.component';

const routes: Routes = [
    {
        path: '',
        component: OrderListComponent,
    },
    {
        path: 'edit/:id',
        component: OrderEditComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
