import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private usuarioServie: UsuarioService) { }

  canActivate(): boolean {
    let token = this.usuarioServie.token ?? false;

    if (token) {
      this.router.navigate(['/dashboard']);
    } else {
      return true;
    }

  }

}
