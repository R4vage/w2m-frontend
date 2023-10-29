import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.method === 'POST' ||
      req.method === 'PATCH' ||
      req.method === 'DELETE'
    ) {
      this.loadingService.show();

      return next.handle(req).pipe(
        delay(1500),
        finalize(() => this.loadingService.hide())
      );
    }

    return next.handle(req);
  }
}
