import { Component, OnInit } from '@angular/core';
import {
  Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd
} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  moduleLoading: boolean;

  public baseUrl = environment.pizzaUrl;

  constructor(
    private router: Router,
    public auth: AuthService,
    public cart: CartService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.moduleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.moduleLoading = false;
      }
    });
  }

  signout() {
    this.auth.signout();
    this.router.navigateByUrl('/');
  }
}
