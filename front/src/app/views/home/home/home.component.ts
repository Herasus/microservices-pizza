import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images = ['assets/images/pizza1.jpg', 'assets/images/pizza2.jpg', 'assets/images/gallery-2.jpg'];

  public featuredPizzas = [];

  public baseUrl = environment.pizzaUrl;

  constructor(private pizzaService: PizzaService) {
    this.pizzaService.getPizzas()
      .then(pizzas => {
        this.featuredPizzas = pizzas.slice(0, 6);
      });
  }
}
