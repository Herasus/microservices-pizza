import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-livreur-create',
  templateUrl: './livreur-create.component.html',
  styleUrls: ['./livreur-create.component.scss']
})
export class LivreurCreateComponent implements OnInit {
  livreurForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.initLivreurForm();
  }

  initLivreurForm() {
    this.livreurForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmitLivreurForm() {
    const formValue = this.livreurForm.value;
    const newDelivers = {
      firstName: formValue['firstName'],
      lastName: formValue['lastName'],
    };

    return this.http.post(environment.deliveryUrl + '/delivers', newDelivers).toPromise()
      .then((data) => {
        this.router.navigate(['livreur']);
        this.alert.showNotification('bottom', 'right', 'success', 'Livreur crée');
      });
  }

  getErrorMessage(field: string, errorCode: string, text: string) {
    return this.livreurForm.controls[field].hasError('required') ? 'Entrer une valeur' :
      this.livreurForm.controls[field].hasError(errorCode) ? 'Champ "' + text + '" non valide' : '';
  }

}
