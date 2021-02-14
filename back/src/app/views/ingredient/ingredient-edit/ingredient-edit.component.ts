import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IngredientModel } from '../../../model/ingredient.model';

@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit {

  ingredientForm: FormGroup;
  ingredient: IngredientModel;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.initIngredientForm();

    this.route.params.subscribe(params => {
      const ingredientId = +params['id'];
      this.http.get<IngredientModel>(environment.pizzaApiUrl + 'ingredients/' + ingredientId).toPromise().then(data => {
        this.ingredient = data;
        this.ingredientForm.patchValue(this.ingredient);
      });
    });
  }

  initIngredientForm() {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmitIngredientForm() {
    const formValue = this.ingredientForm.value;
    const newIngredient = {
      name: formValue['name'],
    };

    return this.http.put(environment.pizzaApiUrl + 'ingredients/' + this.ingredient.id, newIngredient).toPromise()
      .then((data) => {
        this.router.navigate(['ingredient']);
        this.alert.showNotification('bottom', 'right', 'success', 'Ingrédient modifié');
      });
  }

  getErrorMessage(field: string, errorCode: string, text: string) {
    return this.ingredientForm.controls[field].hasError('required') ? 'Entrer une valeur' :
      this.ingredientForm.controls[field].hasError(errorCode) ? 'Champ "' + text + '" non valide' : '';
  }

}
