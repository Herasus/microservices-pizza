import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientModel} from '../../../model/ingredient.model';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../../services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {PizzaModel} from '../../../model/pizza.model';

@Component({
  selector: 'app-pizza-edit',
  templateUrl: './pizza-edit.component.html',
  styleUrls: ['./pizza-edit.component.scss']
})
export class PizzaEditComponent implements OnInit {
  pizzaForm: FormGroup;
  ingredients: IngredientModel[];
  ingredientControl: FormControl;
  pizza: PizzaModel;
  imagePizzaSrc: string | ArrayBuffer;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private http: HttpClient, private alert: AlertService, private router: Router) { }

  ngOnInit() {
    this.ingredientControl = new FormControl();
    this.initPizzaForm();
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      const pizzaId = +params['id'];
      this.http.get<IngredientModel[]>(environment.pizzaApiUrl + 'ingredients').toPromise().then(data => {
        this.ingredients = data;
        this.http.get<PizzaModel>(environment.pizzaApiUrl + 'pizzas/' + pizzaId).toPromise().then(pizza => {
          this.pizza = {
            ...pizza,
            basePrice: pizza.basePrice,
          };
          this.pizzaForm.patchValue(this.pizza);
          const listIngredient = [];
          for (const elem of this.pizza.ingredients) {
            listIngredient.push(elem.id);
          }
          this.ingredientControl.setValue(listIngredient);
        });
      });
    });
  }

  initPizzaForm() {
    this.pizzaForm = this.formBuilder.group({
      name: ['', Validators.required],
      basePrice: [1, Validators.required],
      description: ['', Validators.required],
      ingredientList: this.formBuilder.array([]),
      photo: [{ value: undefined}],
    });
  }

  onSubmitPizzaForm() {
    const formValue = this.pizzaForm.value;
    const newPizza = {
      name: formValue['name'],
      basePrice: +formValue['basePrice'],
      description: formValue['description'],
      ingredients: this.ingredientControl.value,
    };

    return this.http.put(environment.pizzaApiUrl + 'pizzas/' + this.pizza.id, newPizza).toPromise()
        .then((data) => {
          if (formValue['photo'].files && formValue['photo'].files[0]) {
            const formData = new FormData();
            formData.append('image', formValue['photo'].files[0]);
            const pizzaId = this.pizza.id;
            console.log('pizzaId', pizzaId);
            return this.http.post(environment.pizzaApiUrl + 'pizzas/' + pizzaId + '/image', formData).toPromise().then(res => {
              if (res === 200) {
                this.router.navigate(['pizza']);
                this.alert.showNotification('bottom', 'right', 'success', 'Pizza modifiée');
                this.alert.showNotification('bottom', 'right', 'success', 'Image téléchargée');
              } else {
                this.router.navigate(['pizza']);
                this.alert.showNotification('bottom', 'right', 'success', 'Pizza modifiée');
                this.alert.showNotification('bottom', 'right', 'danger', 'Problème lors du téléchargement de l\'image');
              }
            });
          } else {
            this.router.navigate(['pizza']);
            this.alert.showNotification('bottom', 'right', 'success', 'Pizza modifiée');
          }
        });
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
