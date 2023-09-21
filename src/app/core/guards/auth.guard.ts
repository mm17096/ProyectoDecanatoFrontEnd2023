import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private usuarioService: UsuarioService,
    ) { }


        canActivate(): Observable<boolean> | boolean {
        return this.usuarioService.validarToken().pipe(
                tap(isAuth => {
                    if (!isAuth) {
                        this.router.navigateByUrl('/account/login');
                    }
                    return true;
                })
            );
        }

        canLoad(): Observable<boolean> | boolean {
       return this.usuarioService.validarToken().pipe(
                tap(isAuth => {
                    if (!isAuth) {
                        this.router.navigateByUrl('/account/login');
                    }
                    return true;
                })
            );
        }

        
}
