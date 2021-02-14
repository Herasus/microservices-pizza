import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public sizes = [
    {
      type: 'small',
      name: 'Naine'
    },
    {
      type: 'medium',
      name: 'Humaine'
    },
    {
      type: 'large',
      name: 'Ogresse'
    }
  ];

  public cart = [
    // {
    //     id: 4,
    //     name: 'Pizza 1',
    //     path: "assets/images/pizza-1.jpg",
    //     basePrice: 13,
    //     quantity: {
    //         small: 1,
    //         medium: 0,
    //         large: 2
    //     }
    // },
    // {
    //     id: 6,
    //     name: 'Pizza 2',
    //     path: "assets/images/pizza-2.jpg",
    //     basePrice: 16,
    //     quantity: {
    //         small: 0,
    //         medium: 1,
    //         large: 0
    //     }
    // }
  ];

  constructor(private localStore: LocalStoreService,
    private http: HttpClient) {
    let cart = this.localStore.getItem('cart');
    if (cart) {
      this.cart = cart;
    }
  }

  onCartUpdated() {
    this.localStore.setItem('cart', this.cart);
  }

  getPizzaPrice(pizza) {
    return pizza.basePrice * (2 / 3) * pizza.quantity.small
                + pizza.basePrice * pizza.quantity.medium
                + pizza.basePrice * (4 / 3) * pizza.quantity.large;
  }

  getPizzaQuantity(pizza) {
    return pizza.quantity.small
                + pizza.quantity.medium
                + pizza.quantity.large;
  }

  getTotalPrice() {
    return this.cart.reduce((acc, val) => acc + this.getPizzaPrice(val), 0);
  }

  addToCart(pizza, size) {
    // Search for the pizza in cart
    let pizzaInCart = this.cart.find(item => item.id == pizza.id);
    if (!pizzaInCart) {
      pizzaInCart = {
        id: pizza.id,
        name: pizza.name,
        path: pizza.path,
        basePrice: pizza.basePrice,
        quantity: {
          small: 0,
          medium: 0,
          large: 0
        }
      };
      // Add the pizza
      this.cart.push(pizzaInCart);
    }

    // Increase quantity
    pizzaInCart.quantity[size]++;

    // Update cart
    this.onCartUpdated();
  }

  remove(pizza, type) {
    if (pizza.quantity[type] == 0) return;
    pizza.quantity[type]--;

    if (this.getPizzaQuantity(pizza) == 0) {
      this.cart.splice(this.cart.findIndex(item => item.id == pizza.id), 1);
    }

    // Update cart
    this.onCartUpdated();
  }

  add(pizza, type) {
    pizza.quantity[type]++;
    // Update cart
    this.onCartUpdated();
  }

  getNumberOfPizzas() {
    return this.cart.reduce((acc, val) => acc + val.quantity.small + val.quantity.medium + val.quantity.large, 0);
  }

  isEmpty() {
    return this.cart.length == 0;
  }

  emptyCart() {
    this.cart = [];
    this.onCartUpdated();
  }

  placeOrder(address) {
    let pizzaList = [];
    for (let pizza of this.cart) {
      for (let type of this.sizes) {
        if (pizza.quantity[type.type] === 0) continue;
        pizzaList.push({
          pizzaId: pizza.id,
          quantity: pizza.quantity[type.type],
          size: type.type
        });
      }
    }

    return this.http.post(`${environment.orderUrl}/orders`, {
      address,
      pizzaList
    })
      .toPromise();
  }
}
