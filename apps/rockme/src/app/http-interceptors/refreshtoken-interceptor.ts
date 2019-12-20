import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, of, pipe, throwError } from 'rxjs';
import { ApiAuthService } from '../auth/api-auth.service';
import { catchError, retry, tap, finalize, switchMap, filter, take } from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(public authService: ApiAuthService) {}

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const user = this.authService.getUser();

    const authHeader = request.headers.get('Authorization');
    if (user && (!authHeader || !authHeader.length)) {
      //update request
      request = this.addToken(request, user.apiToken);
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
              switchMap((response: any) => {
                this.isRefreshing = false;
                this.authService.setUserToken(response.api_token);
                this.refreshTokenSubject.next(this.addToken(request, response.api_token));
                return next.handle(request);
              })
            );
          } else {
            //blocking calls
            return this.refreshTokenSubject.pipe(
              filter(token => token != null),
              take(1),
              switchMap(jwt => {
                return next.handle(this.addToken(request, jwt));
              })
            );
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
