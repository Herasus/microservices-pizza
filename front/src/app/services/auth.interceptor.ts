import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import {
  Observable, Subject, of, throwError
} from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();

  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private auth: AuthService) {
  }

  refreshToken() {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    }
    this.refreshTokenInProgress = true;
    return this.auth.refreshToken()
      .pipe(tap(() => {
        this.refreshTokenInProgress = false;
        this.tokenRefreshedSource.next();
      }));
  }

  addAuthHeader(req: HttpRequest<any>) {
    let authReq;
    if (this.auth.token != null) {
      const authHeader = `Bearer ${this.auth.token}`;
      authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
    } else {
      authReq = req;
    }
    return authReq;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = this.addAuthHeader(req);
    return next.handle(request)
      .pipe(catchError(err => {
        if (req.url === `${environment.authUrl}/auth`) {
          return throwError(err);
        }

        if (req.url === `${environment.authUrl}/refresh`) {
          this.auth.signout();
          return throwError(err);
        }

        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.refreshToken()
            .pipe(switchMap(() => {
              request = this.addAuthHeader(request);
              return next.handle(request);
            }));
        }

        return throwError(err);
      }));
  }
}
