import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import { map } from "rxjs/operators";
import { LocalStoreService } from "./local-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string | null;

  constructor(
    private http: HttpClient,
    private localStore: LocalStoreService,
    private router: Router,
  ) {
    this.token = null;
    const token = this.localStore.getItem('pizzaAdminAuth');
    if (token) {
      this.token = token.token;
    }
  }


  public isAuthenticated(): boolean {
    return this.token !== null;
  }

  async login(email: string, password: string) {
    const auth = await this.http.post<{ token: string }>(environment.authApiUrl + '/auth/admin', { email, password })
      .toPromise();

    this.token = auth.token;
    this.localStore.setItem('pizzaAdminAuth', { token: this.token });

    return this.token;
  }

  refreshToken() {
    return this.http.post<{ token: string; }>(`${environment.authApiUrl}/refresh`, {})
      .pipe(map(auth => {
        this.token = auth.token;
        this.localStore.setItem('pizzaAdminAuth', { token: this.token });
      }));
  }

  async logout() {
    this.token = null;
    this.localStore.setItem('pizzaAdminAuth', null);

    this.router.navigateByUrl('/login');
  }
}