import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenInterceptor } from './refreshtoken-interceptor';
import { AuthInterceptor } from './auth-interceptor';
import { ProgressInterceptor } from './progess-interceptor';
/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true }
];
