import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-vehicule-create',
  templateUrl: './vehicule-create.component.html',
  styleUrls: ['./vehicule-create.component.scss']
})
export class VehiculeCreateComponent implements OnInit {

  vehiculeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.initVehiculeForm();
  }

  initVehiculeForm() {
    this.vehiculeForm = this.formBuilder.group({
      type: ['', Validators.required],
      plate: ['', Validators.required],
    });
  }

  onSubmitVehiculeForm() {
    const formValue = this.vehiculeForm.value;
    const newVehicule = {
      type: formValue['type'],
      plate: formValue['plate'],
    };

    return this.http.post(environment.deliveryUrl + '/vehicles', newVehicule).toPromise()
      .then((data) => {
        this.router.navigate(['vehicule']);
        this.alert.showNotification('bottom', 'right', 'success', 'Véhicule crée');
      });
  }

  getErrorMessage(field: string, errorCode: string, text: string) {
    return this.vehiculeForm.controls[field].hasError('required') ? 'Entrer une valeur' :
      this.vehiculeForm.controls[field].hasError(errorCode) ? 'Champ "' + text + '" non valide' + ((errorCode === 'pattern') ? '. Format: AA-000-AA ' : '') : '';
  }
}
