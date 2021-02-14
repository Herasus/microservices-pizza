import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { getApiErrorMessage } from 'src/app/utils/error-message';
import { environment } from '../../../../environments/environment';
import { OrderModel } from '../../../models/order.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  historicOrders: OrderModel[] = [];

  pendingOrders: OrderModel[] = [];

  closeResult: string;

  addBalance = 0;

  error: string;

  stateToText = {
    preparation: 'Préparation',
    delivery: 'Livraison en cours',
    delivered: 'Livré',
  }

  constructor(public auth: AuthService, private http: HttpClient, public alerts: AlertService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.auth.loadProfile();
    this.http.get<OrderModel[]>(`${environment.orderUrl}/orders`).toPromise()
      .then(data => {
        this.pendingOrders = data.filter(d => d.state !== 'delivered');
        this.historicOrders = data.filter(d => d.state === 'delivered');
      });
  }

  open(content) {
    this.modalService.open(content,
      { centered: true, size: 'lg', windowClass: 'dark-modal' });
  }

  saveNewBalance() {
    if (this.addBalance > 0) {
      const data = {
        amount: this.addBalance,
      };
      this.http.post(`${environment.bankUrl}/user/balance/add`, data).toPromise()
        .then(result => {
          this.addBalance = 0;
          this.error = undefined;
          this.modalService.dismissAll();
          this.auth.loadProfile();
        })
        .catch(err => {
          this.error = getApiErrorMessage(err);
        });
    } else {
      this.error = 'Veuillez renseigner un montant valide.';
    }
  }
}
