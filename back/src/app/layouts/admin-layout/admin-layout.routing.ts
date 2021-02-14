import { Routes } from '@angular/router';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'ingredient',
        loadChildren: '../../views/ingredient/ingredient.module#IngredientModule',
    },
    {
        path: 'livreur',
        loadChildren: '../../views/livreur/livreur.module#LivreurModule',
    },
    {
        path: 'order',
        loadChildren: '../../views/order/order.module#OrderModule',
    },
    {
        path: 'pizza',
        loadChildren: '../../views/pizza/pizza.module#PizzaModule',
    },
    {
        path: 'vehicule',
        loadChildren: '../../views/vehicule/vehicule.module#VehiculeModule',
    }
];
