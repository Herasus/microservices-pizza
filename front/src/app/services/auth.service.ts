import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginToken } from '../models/login-token.model';
import { User } from '../models/user.model';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;

  token = null;

  user: User = null;

  balance: number = null;

  constructor(
    private store: LocalStoreService,
    private http: HttpClient
  ) {
    this.loadFromStorage();
    this.authenticated = this.checkAuth();
  }

  loadFromStorage() {
    this.token = this.store.getItem('token');
    this.user = this.store.getItem('user');
  }

  checkAuth() {
    return this.token !== null && this.user !== null;
  }

  getuser() {
    return of({});
  }

  signin(credentials) {
    return this.http.post(`${environment.authUrl}/auth`, credentials).toPromise()
      .then((data: LoginToken) => {
        this.setCredentials(data);
        this.authenticated = true;
      });
  }

  register(credentials) {
    return this.http.post(`${environment.authUrl}/register`, credentials).toPromise();
  }

  setCredentials(credentials: LoginToken) {
    this.token = credentials.token;
    this.store.setItem('token', this.token);
  }

  loadProfile() {
    if (!this.token) return;
    this.loadBalance();
    this.http.get<User>(`${environment.authUrl}/profile`).toPromise()
      .then(user => {
        this.user = user;

        console.log(this.user);

        this.store.setItem('user', this.user);
      });
  }

  async loadBalance() {
    if (!this.token) return;
    const { balance } = await this.http.get<{balance: number}>(`${environment.bankUrl}/user/balance`).toPromise();
    this.balance = balance;
  }

  refreshToken() {
    return this.http.post(`${environment.authUrl}/refresh`, {})
      .pipe(map((data: LoginToken) => {
        this.setCredentials(data);
        return data;
      }));
  }

  signout() {
    this.authenticated = false;
    this.store.setItem('token', null);
    this.store.setItem('user', null);
  }
}
