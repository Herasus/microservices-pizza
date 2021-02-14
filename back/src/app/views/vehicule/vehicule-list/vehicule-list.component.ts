import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IngredientModel } from '../../../model/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { VehiculeModel } from '../../../model/vehicule.model';

@Component({
  selector: 'app-vehicule-list',
  templateUrl: './vehicule-list.component.html',
  styleUrls: ['./vehicule-list.component.scss']
})
export class VehiculeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'plate', 'busy', 'actions'];
  vehicules: MatTableDataSource<VehiculeModel>;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  constructor(private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.http.get<VehiculeModel[]>(environment.deliveryUrl + '/vehicles').toPromise().then(data => {
      const vehicles = data;
      vehicles.forEach(item => (item.type === 'car') ? item.type = 'Voiture' : item.type = '2 roues');
      this.vehicules = new MatTableDataSource<VehiculeModel>(vehicles);
      this.vehicules.paginator = this.paginator;
      this.vehicules.sort = this.sort;
    })
  }

  applyFilterVehicule(filterValue: any) {
    this.vehicules.filter = filterValue.value.trim().toLowerCase();
  }

  deleteVehicule(id: number) {
    this.http.delete(environment.deliveryUrl + '/vehicles/' + id).toPromise().then(data => {
      this.alert.showNotification('bottom', 'right', 'success', 'Véhicule supprimé');
      this.loadData();
    })
  }

}
