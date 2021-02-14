import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AlertType } from 'src/app/models/alert-type.model';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {
  startForm: FormGroup;

  submitted: boolean = false;

  loading: boolean = false;

  public baseUrl = environment.pizzaUrl;

  constructor(
    public cart: CartService,
    public auth: AuthService,
    public fb: FormBuilder,
    private alerts: AlertService,
    private router: Router
  ) {
    this.startForm = this.fb.group({
      address: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Load balance
    this.auth.loadBalance();
  }

  order() {
    this.submitted = true;
    if (!this.startForm.valid || this.loading) return;

    this.loading = true;

    let address = `${this.startForm.controls.address.value}, ${this.startForm.controls.zip.value} ${this.startForm.controls.city.value}`;

    this.cart.placeOrder(address)
      .then(() => {
        return this.auth.loadProfile();
      })
      .then(() => {
        // On vide le panier
        this.cart.emptyCart();
        // On affiche un message
        this.alerts.set(AlertType.SUCCESS, 'Votre commande a bien été prise en compte. Merci de commander avec PizzaFAST !', true);
        // On redirige vers le profil
        this.router.navigateByUrl('/profile');
      })
      .finally(() => {
        this.loading = false;
      });
  }

  isMobileMenu() {
    return $(window).width() <= 991;
  }
}
