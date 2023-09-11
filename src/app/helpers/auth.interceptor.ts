import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from '../account/auth/services/usuario.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private apiService: UsuarioService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokend = this.apiService.token;

    if(tokend){
       const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${tokend}`)
       });
       return next.handle(cloned);
    }
    return next.handle(request);
  }
}
