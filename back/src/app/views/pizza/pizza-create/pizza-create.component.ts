import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { IngredientModel } from '../../../model/ingredient.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-pizza-create',
  templateUrl: './pizza-create.component.html',
  styleUrls: ['./pizza-create.component.scss']
})
export class PizzaCreateComponent implements OnInit {
  // TODO: gérer l'ajout de photo
  pizzaForm: FormGroup;
  ingredients: IngredientModel[];
  ingredientControl: FormControl;
  imagePizzaSrc: string | ArrayBuffer;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.ingredientControl = new FormControl();
    this.initPizzaForm();
    this.loadData();
  }

  loadData() {
    this.http.get<IngredientModel[]>(environment.pizzaApiUrl + 'ingredients').toPromise().then(data => {
      this.ingredients = data;
    })
  }

  initPizzaForm() {
    this.pizzaForm = this.formBuilder.group({
      name: ['', Validators.required],
      basePrice: [1, Validators.required],
      description: ['', Validators.required],
      ingredientList: this.formBuilder.array([]),
      photo: [{ value: undefined }],
    });
  }

  onSubmitPizzaForm() {
    const formValue = this.pizzaForm.value;
    const newPizza = {
      name: formValue['name'],
      basePrice: +formValue['basePrice'],
      description: formValue['description'],
      ingredients: this.ingredientControl.value || [],
    };

    return this.http.post<{ id: number }>(environment.pizzaApiUrl + 'pizzas', newPizza).toPromise()
      .then((data) => {
        if (formValue['photo'].files && formValue['photo'].files[0]) {
          const formData = new FormData();
          formData.append('image', formValue['photo'].files[0]);
          const pizzaId = data.id;
          console.log('pizzaId', pizzaId);
          return this.http.post(environment.pizzaApiUrl + 'pizzas/' + pizzaId + '/image', formData).toPromise().then(res => {
            this.router.navigate(['pizza']);
            this.alert.showNotification('bottom', 'right', 'success', 'Pizza créée');
            this.alert.showNotification('bottom', 'right', 'success', 'Image téléchargée');
          }).catch(() => {
            this.router.navigate(['pizza']);
            this.alert.showNotification('bottom', 'right', 'success', 'Pizza créée');
            this.alert.showNotification('bottom', 'right', 'danger', 'Problème lors du téléchargement de l\'image');
          })
        } else {
          this.router.navigate(['pizza']);
          this.alert.showNotification('bottom', 'right', 'success', 'Pizza créée');
        }
      })
  }

  getErrorMessage(field: string, errorCode: string, text: string) {
    return this.pizzaForm.controls[field].hasError('required') ? 'Entrer une valeur' :
      this.pizzaForm.controls[field].hasError(errorCode) ? 'Champ "' + text + '" non valide' : '';
  }

  readURL(event: Event): void {
    const formValue = this.pizzaForm.value;
    if (formValue['photo'] && formValue['photo'].files[0]) {
      const file = formValue['photo'].files[0];

      const reader = new FileReader();
      reader.onload = e => this.imagePizzaSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

}
