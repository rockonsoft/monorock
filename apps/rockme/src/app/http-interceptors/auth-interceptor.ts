import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { ApiAuthService } from '../auth/api-auth.service';
import { AppUser } from '@monorock/api-interfaces';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user: AppUser;
  constructor(private authService: ApiAuthService) {
    authService.appUser.subscribe({
      next: user => {
        this.user = user;
      }
    });
  }

  private addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'tenant-id': this.user.tenantExternalId,
        'application-id': `${this.user.applicationId}`,
        'user-id': this.user.userId,
        'Cache-Control': 'public,max-age=1,s-maxage=1'
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.user) {
      this.user = this.authService.getUser();
    }

    const authHeader = req.headers.get('tenant-id');

    if (this.user && (!authHeader || !authHeader.length)) {
      //we have a logged in user and the headers are not set
      req = this.addToken(req);
    } else {
      if (!this.user) {
        console.error('no user to add to request header');
      }
    }
    return next.handle(req);
  }
}
