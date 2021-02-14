import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../../services/alert.service';
import {OrderModel} from '../../../model/order.model';
import {environment} from '../../../../environments/environment';
import {LivreurModel} from '../../../model/livreur.model';
import {VehiculeModel} from '../../../model/vehicule.model';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  deliveryForm: FormGroup;
  order: OrderModel;
  avalaibleDelivers: LivreurModel[];
  avalaibleVehicles: VehiculeModel[];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.initDeliveryForm();
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      const orderId = +params['id'];
      this.http.get<OrderModel>(environment.orderUrl + '/admin/orders/' + orderId).toPromise().then(data => {
        this.order = data;
      });
    });

    this.http.get<LivreurModel[]>(environment.deliveryUrl + '/delivers').toPromise().then(delivers => {
      console.log('delivers', delivers);
      this.avalaibleDelivers = delivers;
    });

    this.http.get<VehiculeModel[]>(environment.deliveryUrl + '/vehicles').toPromise().then(vehicles => {
      console.log('vehicles', vehicles);
      this.avalaibleVehicles = vehicles;
    });
  }

  initDeliveryForm() {
    this.deliveryForm = this.formBuilder.group({
      vehicle_id: ['', Validators.required],
      delivery_man_id: ['', Validators.required],
    });
  }

  onSubmitDeliveryForm() {
    const formValue = this.deliveryForm.value;
    this.order.state = 'delivery';
    this.order.delivery_man_id = formValue['delivery_man_id'];
    this.order.vehicle_id = formValue['vehicle_id'];

    return this.http.post(environment.deliveryUrl + '/orders/' + this.order.id + '/assign', {
      deliveryManId: this.order.delivery_man_id,
      vehicleId: this.order.vehicle_id,
    }).toPromise()
        .then((data) => {
            this.router.navigate(['order']);
            this.alert.showNotification('bottom', 'right', 'success', 'Commande en cours de livraison');
        });
  }

  getErrorMessage(field: string, errorCode: string, text: string) {
    return this.deliveryForm.controls[field].hasError('required') ? 'Entrer une valeur' :
        this.deliveryForm.controls[field].hasError(errorCode) ? 'Champ "' + text + '" non valide' : '';
  }
}
