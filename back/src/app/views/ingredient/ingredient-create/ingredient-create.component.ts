import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.scss']
})
export class IngredientCreateComponent implements OnInit {
  ingredientForm: FormGroup;
  imageIngredientSrc: string | ArrayBuffer;


  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.initIngredientForm();
  }

  initIngredientForm() {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      photo: [{ value: undefined }],
    });
  }

  onSubmitIngredientForm() {
    const formValue = this.ingredientForm.value;
    const newIngredient = {
      name: formValue['name'],
    };

    return this.http.post<{ id: number }>(environment.pizzaApiUrl + 'ingredients', newIngredient).toPromise()
      .then((data) => {
        if (formValue['photo'].files && formValue['photo'].files[0]) {
          const formData = new FormData();
          formData.append('image', formValue['photo'].files[0]);
          const ingredient = data;
          console.log('ingredientId', ingredient);
          return this.http.post(environment.pizzaApiUrl + 'ingredients/' + ingredient.id + '/image', formData).toPromise().then(res => {
            this.router.navigate(['ingredient']);
            this.alert.showNotification('bottom', 'right', 'success', 'Ingrédient crée');
            this.alert.showNotification('bottom', 'right', 'success', 'Image téléchargée');
          }).catch(() => {
            this.router.navigate(['ingredient']);
            this.alert.showNotification('bottom', 'right', 'success', 'Ingrédient crée');
            this.alert.showNotification('bottom', 'right', 'danger', 'Problème lors du téléchargement de l\'image');
          });
        } else {
          this.router.navigate(['ingredient']);
          this.alert.showNotification('bottom', 'right', 'success', 'Ingrédient crée');
        }
      });
  }

  getErrorMessage(field: string, errorCode: string, text: string) {
    return this.ingredientForm.controls[field].hasError('required') ? 'Entrer une valeur' :
      this.ingredientForm.controls[field].hasError(errorCode) ? 'Champ "' + text + '" non valide' : '';
  }

  readURL(event: Event): void {
    const formValue = this.ingredientForm.value;
    if (formValue['photo'] && formValue['photo'].files[0]) {
      const file = formValue['photo'].files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageIngredientSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

}
