import { Injectable, NgZone, inject } from '@angular/core';
import { Empleado, Usuario } from '../models/usuario.models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IEmail, ILoginUsuario, IRegistroUsuario } from '../interfaces/usuario';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { IEmpleado } from 'src/app/modules/empleado/interface/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  storage: Storage = window.localStorage;
  public usuario!: Usuario;
  public empleado!: Empleado;
  private http = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) { }

  /* Creacion de usuario */
/*   crearUsuario(forData: IRegistroUsuario) {
    console.log();
    return this.http.post(`${this.baseUrl}/usuarios`, forData).pipe(
      tap((resp: any) => {
        this.guardarLocalSotrage('token', resp.token);
        this.usuario = resp.usuario;
      })
    );
  } */

  /* Para autentificar la entrada */
  login(forData: ILoginUsuario) {
    const body = {
      nombre: forData.nombre,
      clave: forData.clave
    };

    return this.http.post(`${this.baseUrl}/usuario/auth/login`, body).pipe(
      tap((resp: any) => {
        const { codigoUsuario, nombre, clave, nuevo, rol, token, empleado } = resp.usuario;
        this.usuario = new Usuario(codigoUsuario, nombre, "", nuevo, "", token, empleado);
        this.guardarLocalSotrage('token', resp.token);
        this.guardarLocalSotrage('codEmpleado', resp.empleado.codigoEmpleado);
        this.guardarLocalSotrage('empleadoFoto', resp.empleado.nombrefoto);
        this.guardarLocalSotrage('codUsuario', resp.codigoUsuario);
      }),
      catchError(err => {
        return throwError(err.error.message);
      })
    );
  }

  /* Para guardar en el local storage del navegador */
  guardarLocalSotrage(tipo: string, contenido: string) {
    this.storage.setItem(tipo, contenido);
  }


  /* Para obtener el token del localstorage */
  get token(): string {
    return this.storage.getItem("token" || "");
  }

  get codUsuario(): string {
    return this.storage.getItem("codUsuario" || "");
  }

  get codEmpleado(): string {
    return this.storage.getItem("codEmpleado" || "");
  }

  get empleadofoto(): string {
    return this.storage.getItem("empleadoFoto" || "");
  }

  getUsuario() {
    this.http
      .get(`${this.baseUrl}/usuario/${this.codUsuario}`)
      .pipe(tap((resp: any) => resp.content as any))
      .subscribe(
        (usuario: any) => {
          const { codigoUsuario, nombre, clave, nuevo, rol, token, empleado } = usuario;
          this.usuario = new Usuario(codigoUsuario, nombre, "", nuevo, "", token, empleado);
        },
        (error) => {
          console.error("Error al obtener los usuario:", error);
        }
      );
  }


  getEmpleado() {
    this.http
      .get(`${this.baseUrl}/empleado/${this.codEmpleado}`)
      .pipe(map((resp: any) => resp as any))
      .subscribe(
        (empleado: any) => {
          this.empleado = empleado; // guarda Empleado
          const { codigoEmpleado, dui, nombre, apellido, telefono, licencia, tipolicencia, fechalicencia, estado, jefe, correo, nombrefoto, urlfoto, cargo, departamento } = empleado;
          this.empleado = new Empleado(codigoEmpleado, dui, nombre, apellido, telefono, licencia, tipolicencia, fechalicencia, estado, jefe, correo, nombrefoto, urlfoto, cargo, departamento);
        },
        (error) => {
          console.error("Error al obtener los empleado:", error);
        }
      );
  }


  public Credenciales(usuario: Usuario): any {
    return this.http.put(`${this.baseUrl}/usuario/credenciales`, usuario);
  }


  logout() {
    //este servicio cierra sesion si sirve el token
    /*    this.http.put(`${this.baseUrl}/usuario/auth/sesion`, this.codUsuario)
          .subscribe(
            () => {
              this.storage.removeItem("token");
              this.storage.removeItem("codEmpleado");
              this.storage.removeItem("codUsuario");
              this.storage.removeItem("empleadoFoto");
              this.ngZone.run(() => {
                this.router.navigateByUrl('/account/login');
              });
            },
            (error) => {
              //si el tokend es dañado Forsa cerrar la sesion y borra el token
              this.storage.removeItem("token");
              this.ForsarSesion();
              console.error('Ocurrió un error al cerrar sesión', error);
            }
          ); */

    this.storage.removeItem("token");
    this.storage.removeItem("codEmpleado");
    this.storage.removeItem("codUsuario");
    this.storage.removeItem("empleadoFoto");
    this.ngZone.run(() => {
      this.router.navigateByUrl('/account/login');
    });
  }

  SendEmail(body: IEmail){
    return this.http.post(`${this.baseUrl}/correo/enviarmail`, body).pipe(
      tap((resp: any) => {
        console.log(resp);
      }),
      catchError(err => {
        return throwError(err.error.message);
      })
    );
  }

  //servicio que forsa cerrar la sesion activa
  /*   ForsarSesion(){
      this.http.put(`${this.baseUrl}/usuario/auth/sesion`, this.codUsuario)
      .subscribe(
        () => {
          this.storage.removeItem("codEmpleado");
          this.storage.removeItem("codUsuario");
          this.storage.removeItem("empleadoFoto");
          this.ngZone.run(() => {
            this.router.navigateByUrl('/account/login');
          });
        },
        (error) => {
          this.storage.removeItem("codEmpleado");
          this.storage.removeItem("codUsuario");
          this.storage.removeItem("empleadoFoto");
          console.error('Ocurrió un error al cerrar sesión', error);
        }
      );
    } */


  validarToken(): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/usuario/auth/renew`, {
      headers: {
        'x-token': this.token,
      },
    }).pipe(
      map((resp: any) => {
        this.guardarLocalSotrage('token', resp.token);
        this.guardarLocalSotrage('codEmpleado', resp.empleado.codigoEmpleado);
        this.guardarLocalSotrage('empleadoFoto', resp.empleado.nombrefoto);
        this.guardarLocalSotrage('codUsuario', resp.codigoUsuario);
        return true;
      }),
      catchError((err) => {
        // Token caducado, muestra un mensaje de error en la consola
        this.logout();
        return of(false);
      })
    );
  }

  /* get rol(): "ADMIN_ROLE" | "USER_ROLE" | string {
    //return this.usuario.role;
  } */

}
