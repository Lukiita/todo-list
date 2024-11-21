import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  let requestUrl = req.url;

  if (!requestUrl.includes('http')) {
    requestUrl = `${environment.baseUrl}${requestUrl}`;
  }

  if (!requestUrl.includes('login')) {
    const token = localStorage.getItem('token');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  console.log('Request URL', requestUrl);
  req = req.clone({
    url: requestUrl
  });

  return next(req);
};
