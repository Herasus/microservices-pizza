import { Component } from '@angular/core';
import {
  Router, ActivatedRoute, RouteConfigLoadEnd, ResolveEnd
} from '@angular/router';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pizza-front';

  constructor(
    private router: Router,
    private alerts: AlertService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.auth.loadProfile();

    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        alerts.clearTemp();
      }
    });
  }
}
