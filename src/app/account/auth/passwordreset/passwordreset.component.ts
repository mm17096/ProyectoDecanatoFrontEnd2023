import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { IEmail, IRespass } from '../interfaces/usuario';
import { MensajesService } from 'src/app/shared/global/mensajes.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;

  code: boolean = false;
  resetpass: boolean = false;

  msjclave!: string;
  seguridad!: string;
  msjclaveconfir!: string;
  confirma!: string;
  media!: boolean;
  public showPassword: boolean = false;
  public password: string = "";
  public showPassword2: boolean = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private mensajesService: MensajesService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      correo: ['', [Validators.required]],
      dui: ['', [Validators.required]],
      clave: [''],
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    if (this.resetForm.valid && !this.code && !this.resetpass) {

      const rest: IRespass = {
        correo: this.resetForm.get('correo').value,
        dui: this.resetForm.get('dui').value,
        codigo: this.generarCodigoAleatorio(),
      }

      this.usuarioService.resetpass(rest).subscribe(
        (resp) => {
          this.Email();
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
          });
          this.code = false;
        }
      );
    } else if (this.code) {
      this.submitCode();
    } else {
      if (this.confirma == "confirmada" && this.media) {
        this.resetpassword();
      } else {
        Swal.fire({
          position: "center",
          title: "Faltan parametros de seguridad",
          html: "Las claves deben coincidir y tener seguridad media como minimo",
          icon: "warning",
        });
      }
    }
  }

  generarCodigoAleatorio() {
    // Genera un número aleatorio entre 0 y 99999 (5 dígitos)
    const codigo = Math.floor(Math.random() * 100000);
    // Convierte el número en una cadena de texto
    const codigoTexto = codigo.toString();
    // Asegura que el código tenga exactamente 5 dígitos, agregando ceros a la izquierda si es necesario
    const codigoCompleto = codigoTexto.padStart(5, '0');
    return codigoCompleto;
  }



  focusNext(event: any, nextInputId: string) {
    const input = document.getElementById(nextInputId) as HTMLInputElement;
    if (event.target.value.length === 1) {
      input.focus();
    }
  }

  submitCode() {
    const code = this.obtenerCodigo();

    if (code.length === 5) {
      // Aquí puedes enviar el código a tu servidor o realizar la acción deseada.
      this.usuarioService.confirmarcode(code).subscribe(
        (resp) => {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });

          Toast.fire({
            icon: 'success',
            text: '¡Código confirmado!'
          }).then(() => {
            this.resetpass = true;
            this.code = false;
            this.usuarioService.getUsuario();
          })
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
          });
          this.resetpass = false;
        }
      );
    } else {
      alert('Por favor, complete el código de 5 dígitos.');
    }
  }

  resetpassword() {
    const clave = this.resetForm.get("clave").value;

    const usuario = this.usuarioService.usuario;
    usuario.clave = clave;

    this.usuarioService.Credenciales(usuario).subscribe(
      (resp: any) => {
        if (resp) {
          if (this.usuarioService.validarToken()) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              //timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              text: "Modificacion exitosa",
            }).then(() => {
              this.router.navigate(['/dashboard']);
              this.resetForm.reset();
            });
          }
        }
      },
      (err: any) => {
        this.mensajesService.mensajesSweet(
          "error",
          "Ups... Algo salió mal",
          err.error.message
        );
      }
    );
  }

  obtenerCodigo() {
    let codigo = '';
    for (let i = 1; i <= 5; i++) {
      const input = document.getElementById('digit' + i) as HTMLInputElement;
      codigo += input.value;
    }
    return codigo;
  }

  SeguridadClave(event: any) {
    const clave = event.target.value;

    this.seguridad = this.evaluarSeguridadClave(clave);
    if (this.seguridad === "alta") {
      this.msjclave = "Seguridad alta";
    } else if (this.seguridad === "media") {
      this.msjclave = "Seguridad media";
    } else {
      this.msjclave = "La clave es poco segura";
    }
  }

  VerificarClaves(event: any) {
    const clave = this.resetForm.get('clave').value;

    const valorConfirClave = event.target.value;

    if (clave === valorConfirClave) {
      this.msjclaveconfir = "Clave confirmada";
      this.confirma = "confirmada";
    } else {
      this.msjclaveconfir = "Las claves no coinciden";
      this.confirma = "errorclave";
    }
  }

  evaluarSeguridadClave(clave: string): "baja" | "media" | "alta" {
    if (clave.length < 5) {
      this.media = false;
      return "baja";
    }
    if (/^[a-zA-Z]+$/.test(clave)) {
      this.media = true;
      return "media";
    }
    if (
      /[0-9]/.test(clave) &&
      /[A-Z]/.test(clave) &&
      /[!@#$%^&*]/.test(clave)
    ) {
      this.media = true;
      return "alta";
    }
    this.media = true;
    return "media";
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }

  Email() {
    const email: IEmail = {
      asunto: 'Cambio de credenciales',
      titulo: 'Cambio de credenciales',
      email: this.usuarioService.correo,
      receptor: "Estimad@ : " + this.usuarioService.nombre,
      mensaje: 'Su cuenta está en proceso de actualización de credenciales. Por motivos de seguridad, hemos enviado un código de verificación que le permitirá completar el proceso de actualización de sus credenciales.',
      centro: 'Utilice este codigo para continuar con el proceso :',
      codigo: this.usuarioService.restcodigo,
      abajo: 'Gracias por tu atención a este importante mensaje.',
    }

    this.usuarioService.SendEmail(email).subscribe(
      (resp) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'success',
          text: '¡Se ha confirmado!'
        }).then(() => {
          this.code = true;
        })
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err,
        });
      }
    );
  }
}


