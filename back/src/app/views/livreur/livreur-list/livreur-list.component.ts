import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IngredientModel } from '../../../model/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LivreurModel } from '../../../model/livreur.model';

@Component({
  selector: 'app-livreur-list',
  templateUrl: './livreur-list.component.html',
  styleUrls: ['./livreur-list.component.scss']
})
export class LivreurListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'busy', 'actions'];
  livreurs: MatTableDataSource<LivreurModel>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  constructor(private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<LivreurModel[]>(environment.deliveryUrl + '/delivers').toPromise().then(data => {
      this.livreurs = new MatTableDataSource<LivreurModel>(data);
      this.livreurs.paginator = this.paginator;
      this.livreurs.sort = this.sort;
    })
  }

  applyFilterLivreurs(filterValue: any) {
    this.livreurs.filter = filterValue.value.trim().toLowerCase();
  }

  deleteLivreur(id: number) {
    this.http.delete(environment.deliveryUrl + '/delivers/' + id).toPromise().then(data => {
      this.alert.showNotification('bottom', 'right', 'success', 'Livreur supprimé');
      this.loadData();
    })
  }
}
