import { Component, Input, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IEmpleado } from '../../interface/empleado.interface';
import { EmpleadoService } from '../../service/empleado.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MensajesService } from 'src/app/shared/global/mensajes.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() empleados!: IEmpleado[];
  @Input() queryString!: string;

  cambio: string;

  formularioEmpleado: FormGroup;
  estado: string;

  constructor(
    private empleadosService: EmpleadoService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formularioEmpleado = this.Iniciarformulario();
  }

  ngOnInit() { }





/*   public static function desencriptacion($string)
    {
        $key = hash('sha256', SECRET_KEY);
        $iv = substr(hash('sha256', SECRET_IV), 0, 16);
        $contra = openssl_decrypt(base64_decode($string), METHOD, $key, 0, $iv);
        return $contra;
    } */

  private Iniciarformulario(): FormGroup {
    return this.fb.group({
      codigoEmpleado: [''],
      dui: [''],
      nombre: [''],
      apellido: [''],
      telefono: [''],
      licencia: [''],
      tipolicencia: [''],
      fechalicencia: [''],
      jefe: [],
      estado: [],
      nombrefoto: [''],
      urlfoto: [''],
      correo: [''],
      cargo: [''],
      departamento: [''],
    });
  }

  cambiarEstado(empleadoED: IEmpleado, estado: number) {

    this.formularioEmpleado.patchValue(empleadoED);
    this.formularioEmpleado.patchValue({
      cargo: empleadoED.cargo.codigoCargo,
    });
    this.formularioEmpleado.patchValue({
      departamento: empleadoED.departamento.codigoDepto,
    });

    if (estado == 8) {
      this.formularioEmpleado.patchValue({
        estado: 9,
      });
      this.cambio = 'Inactivo';
    } else {
      this.formularioEmpleado.patchValue({
        estado: 8,
      });
      this.cambio = 'Activo';
    }

    const empleado = this.formularioEmpleado.value;

    Swal.fire({
      icon: 'question',
      title: "¿Cambiar el estado a " + this.cambio + "?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Cambiar",
      denyButtonText: `No cambiar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadosService.putEmpleado(empleado).subscribe((resp: any) => {
          if (resp) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              //timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              text: 'Modificación exitosa'
            })

            this.recargar();
          }
        }, (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo paso, hable con el administrador',
          });
        });
      } else if (result.isDenied) {
        Swal.fire("Cambios no aplicados", "", "info");
      }
    });
  }

  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  // Método para agregar guion al número del DUI
  InsertarGuion(dui: string): string {
    return dui.slice(0, -1) + '-' + dui.slice(-1);
  }

  /*   RetornarNombre(id: number): string {
      let estado: string = "";
      this.empleadosService.ObtenerestadoporID(id).then(async result => {
        estado = result.nombreEstado;
      });
      return estado;
    } */

}
