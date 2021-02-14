import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  constructor(private http: HttpClient) {

  }

  async getPizzas() {
    return this.http.get<Pizza[]>(`${environment.pizzaUrl}/pizzas`).toPromise();
  }

  getPizza(pizzaId) {
    return this.http.get<Pizza>(`${environment.pizzaUrl}/pizzas/${pizzaId}`).toPromise();
  }
}
