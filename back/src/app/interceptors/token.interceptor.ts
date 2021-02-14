import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';
import {
  Observable, Subject, throwError
} from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();

  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private auth: AuthService) {
  }

  refreshToken(): Observable<any> {
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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let request = this.addAuthHeader(req);
    return next.handle(request)
      .pipe(catchError(err => {
        if (req.url === `${environment.authApiUrl}/auth/admin`) {
          return throwError(err);
        }

        if (req.url === `${environment.authApiUrl}/refresh`) {
          this.auth.logout();
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
