import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {IngredientModel} from '../../../model/ingredient.model';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../../services/alert.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  ingredients: MatTableDataSource<IngredientModel>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  constructor(private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<IngredientModel[]>(environment.pizzaApiUrl + 'ingredients').toPromise().then(data => {
      this.ingredients = new MatTableDataSource<IngredientModel>(data);
      this.ingredients.paginator = this.paginator;
      this.ingredients.sort = this.sort;
    })
  }

  applyFilterIngredient(filterValue: any) {
    this.ingredients.filter = filterValue.value.trim().toLowerCase();
  }

  deleteIngredient(id: number) {
    this.http.delete(environment.pizzaApiUrl + 'ingredients/' + id).toPromise().then(data => {
      if (data === 200) {
        this.alert.showNotification('bottom', 'right', 'success', 'Ingrédient supprimé');
        this.loadData();
      }
    })
  }
}
