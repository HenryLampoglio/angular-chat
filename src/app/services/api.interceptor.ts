import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Verifica se a requisição já é um caminho completo (ex: para APIs externas)
  // Se não for, adiciona a nossa apiUrl do environment
  const apiReq = req.url.startsWith('http')
    ? req
    : req.clone({ url: `${environment.apiUrl}/${req.url}` });

  return next(apiReq);
};
