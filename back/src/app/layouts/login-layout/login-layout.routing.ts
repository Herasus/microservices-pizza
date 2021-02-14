import { Routes } from '@angular/router';

export const LoginLayoutRoutes: Routes = [
  {
    path: '',
    loadChildren: '../../views/login/login.module#LoginModule',
  },
];
