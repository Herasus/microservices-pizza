import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaService } from 'src/app/services/pizza.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';
import { AlertType } from 'src/app/models/alert-type.model';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent {
  public pizza: any = {};

  public selectedSize = 'medium';

  public baseUrl = environment.pizzaUrl;

  constructor(
    private route: ActivatedRoute,
    private pizzaService: PizzaService,
    private cartService: CartService,
    private router: Router,
    private alerts: AlertService
  ) {
    this.pizzaService.getPizza(this.route.snapshot.params.pizza)
      .then(pizza => {
        this.pizza = pizza;
      });
  }

  addToCart() {
    this.cartService.addToCart(this.pizza, this.selectedSize);
    this.alerts.set(AlertType.SUCCESS, 'La pizza a bien été ajoutée au panier. Vous pouvez retourner en arrière pour continuer vos achats, ou valider votre commande.', true);
    this.router.navigateByUrl('/cart');
  }

  getSelectedSizePrice() {
    let m = 1;
    if (this.selectedSize === 'small') {
      m = 2 / 3;
    }
    if (this.selectedSize === 'large') {
      m = 4 / 3;
    }
    return this.pizza.basePrice * m;
  }

  ngOnInit() {

  }
}
