import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private readonly loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;

    this.loadingService.present();
    return next.handle(req).pipe(
      delay(3000),
      finalize(() => {
        this.totalRequests--;

        if (this.totalRequests === 0) {
          this.loadingService.dismiss();
        }
      })
    );
  }
}
