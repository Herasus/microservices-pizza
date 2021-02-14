import { Component } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pizzas',
  templateUrl: 'pizzas.component.html',
  styleUrls: ['pizzas.component.scss']
})
export class PizzasComponent {
  public pizzas = [];

  public baseUrl = environment.pizzaUrl;

  constructor(private pizzaService: PizzaService) {
    pizzaService.getPizzas()
      .then(pizzas => {
        this.pizzas = pizzas;
      });
  }
}
