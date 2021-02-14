import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/order', title: 'Commandes',  icon: 'store', class: '' },
    { path: '/livreur', title: 'Livreurs',  icon: 'people', class: '' },
    { path: '/vehicule', title: 'Véhicules',  icon: 'directions_car', class: '' },
    { path: '/ingredient', title: 'Ingrédients',  icon: 'restaurant', class: '' },
    { path: '/pizza', title: 'Pizzas',  icon: 'local_pizza', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      return $(window).width() <= 991;
  };
}
