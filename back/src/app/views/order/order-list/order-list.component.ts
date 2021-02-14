import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {IngredientModel} from '../../../model/ingredient.model';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../../services/alert.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {OrderModel} from '../../../model/order.model';
import * as moment from 'moment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  displayedColumnsHistoricOrder: string[] = ['id', 'state', 'orderDate', 'deliveryDate', 'totalPrice', 'address', 'actions'];
  ordersHistoricOrders: MatTableDataSource<OrderModel>;

  @ViewChild('paginatorHistoricOrder') paginatorHistoricOrder: MatPaginator;
  @ViewChild('sortHistoricOrder') sortHistoricOrder: MatSort;

  displayedColumnsDeliveryOrder: string[] = ['id', 'state', 'orderDate', 'totalPrice', 'address', 'actions'];
  ordersDeliveryOrders: MatTableDataSource<OrderModel>;

  @ViewChild('paginatorDeliveryOrder') paginatorDeliveryOrder: MatPaginator;
  @ViewChild('sortDeliveryOrder') sortDeliveryOrder: MatSort;

  displayedColumnsPreparationOrder: string[] = ['id', 'state', 'orderDate', 'totalPrice', 'address', 'actions'];
  ordersPreparationOrders: MatTableDataSource<OrderModel>;

  @ViewChild('paginatorPreparationOrder') paginatorPreparationOrder: MatPaginator;
  @ViewChild('sortPreparationOrder') sortPreparationOrder: MatSort;

  constructor(private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<OrderModel[]>(environment.orderUrl + '/admin/orders').toPromise().then(data => {
      this.ordersDeliveryOrders = new MatTableDataSource<OrderModel>(data.filter(d => d.state === 'delivery'));
      this.ordersHistoricOrders = new MatTableDataSource<OrderModel>(data.filter(d => d.state === 'delivered'));
      this.ordersPreparationOrders = new MatTableDataSource<OrderModel>(data.filter(d => d.state === 'preparation'));

      this.ordersDeliveryOrders.paginator = this.paginatorDeliveryOrder;
      this.ordersHistoricOrders.paginator = this.paginatorHistoricOrder;
      this.ordersPreparationOrders.paginator = this.paginatorPreparationOrder;

      this.ordersDeliveryOrders.sort = this.sortDeliveryOrder;
      this.ordersHistoricOrders.sort = this.sortHistoricOrder;
      this.ordersPreparationOrders.sort = this.sortPreparationOrder;
    });
  }

  applyFilterHistoricOrders(filterValue: any) {
    this.ordersHistoricOrders.filter = filterValue.value.trim().toLowerCase();
  }

  applyFilterDeliveryOrders(filterValue: any) {
    this.ordersDeliveryOrders.filter = filterValue.value.trim().toLowerCase();
  }

  applyFilterPreparationOrders(filterValue: any) {
    this.ordersPreparationOrders.filter = filterValue.value.trim().toLowerCase();
  }

  updateOrderToDelivered(id: number) {
    this.http.post(environment.deliveryUrl + '/orders/' + id + '/delivered', {}).toPromise().then(data => {
      this.alert.showNotification('bottom', 'right', 'success', 'Commande livrée');
      this.loadData();
    })
  }
}
