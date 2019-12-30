import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { ApiAuthService } from '../auth/api-auth.service';
import { AppUser } from '@monorock/api-interfaces';
import { ProgressService } from '../services/progress.service';
import { map, tap, finalize, delay } from 'rxjs/operators';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  constructor(private progress: ProgressService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.progress.setBusy();
    return next.handle(req).pipe(
      finalize(() => {
        this.progress.setCompleted();
      })
    );
  }
}
