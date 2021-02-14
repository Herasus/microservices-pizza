import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IngredientModel } from '../../../model/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { PizzaModel } from '../../../model/pizza.model';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'basePrice', 'actions'];
  pizzas: MatTableDataSource<PizzaModel>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  constructor(private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<PizzaModel[]>(environment.pizzaApiUrl + 'pizzas').toPromise().then(data => {
      this.pizzas = new MatTableDataSource<PizzaModel>(data);
      this.pizzas.paginator = this.paginator;
      this.pizzas.sort = this.sort;
    })
  }

  applyFilterPizza(filterValue: any) {
    this.pizzas.filter = filterValue.value.trim().toLowerCase();
  }

  deletePizza(id: number) {
    this.http.delete(environment.pizzaApiUrl + 'pizzas/' + id).toPromise().then(data => {
      this.alert.showNotification('bottom', 'right', 'success', 'Pizza supprimée');
      this.loadData();
    })
  }
}
