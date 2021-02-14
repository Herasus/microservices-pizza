import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LivreurModel } from '../../../model/livreur.model';
import { IngredientModel } from '../../../model/ingredient.model';

@Component({
  selector: 'app-livreur-edit',
  templateUrl: './livreur-edit.component.html',
  styleUrls: ['./livreur-edit.component.scss']
})
export class LivreurEditComponent implements OnInit {

  livreurForm: FormGroup;
  livreur: LivreurModel;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.initLivreurForm();
    this.route.params.subscribe(params => {
      const livreurId = +params['id'];
      this.http.get<LivreurModel>(environment.deliveryUrl + '/delivers/' + livreurId).toPromise().then(data => {
        this.livreur = data;
        this.livreurForm.patchValue(this.livreur);
      });
    });
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

    return this.http.put(environment.deliveryUrl + '/delivers/' + this.livreur.id, newDelivers).toPromise()
      .then((data) => {
        this.router.navigate(['livreur']);
        this.alert.showNotification('bottom', 'right', 'success', 'Livreur modifié');
      });
  }

  getErrorMessage(field: string, errorCode: string, text: string) {
    return this.livreurForm.controls[field].hasError('required') ? 'Entrer une valeur' :
      this.livreurForm.controls[field].hasError(errorCode) ? 'Champ "' + text + '" non valide' : '';
  }

}
