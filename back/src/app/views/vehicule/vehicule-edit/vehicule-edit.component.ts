import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { VehiculeModel } from '../../../model/vehicule.model';
import { LivreurModel } from '../../../model/livreur.model';

@Component({
  selector: 'app-vehicule-edit',
  templateUrl: './vehicule-edit.component.html',
  styleUrls: ['./vehicule-edit.component.scss']
})
export class VehiculeEditComponent implements OnInit {

  vehiculeForm: FormGroup;
  vehicule: VehiculeModel;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.initVehiculeForm();
    this.route.params.subscribe(params => {
      const vehiculeId = +params['id'];
      this.http.get<VehiculeModel>(environment.deliveryUrl + '/vehicles/' + vehiculeId).toPromise().then(data => {
        this.vehicule = data;
        this.vehiculeForm.patchValue(this.vehicule);
      });
    });
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

    return this.http.put(environment.deliveryUrl + '/vehicles/' + this.vehicule.id, newVehicule).toPromise()
      .then((data) => {
        this.router.navigate(['vehicule']);
        this.alert.showNotification('bottom', 'right', 'success', 'Véhicule modifié');
      });
  }

  getErrorMessage(field: string, errorCode: string, text: string) {
    return this.vehiculeForm.controls[field].hasError('required') ? 'Entrer une valeur' :
      this.vehiculeForm.controls[field].hasError(errorCode) ? 'Champ "' + text + '" non valide' + ((errorCode === 'pattern') ? '. Format: AA-000-AA ' : '') : '';
  }
}
