import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IEmpleado } from '../../interface/empleado.interface';
import { EmpleadoService } from '../../service/empleado.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  empleados: IEmpleado[] = [];
  empleado: IEmpleado;
  cambio: string;

  constructor(private empleadosService: EmpleadoService, private router: Router) { }

  ngOnInit() {
    this.getEmpleados();

    this.empleado = {
      dui: "",
      nombre: "",
      apellido: "",
      telefono: "",
      licencia: "",
      tipo_licencia: "",
      fecha_licencia: new Date(),
      estado: 7,
      jefe: false,
      correo: "",
      nombrefoto: "",
      urlfoto: "",
      cargo: null,
      departamento: null
    }
  }


  getEmpleados() {
       this.empleadosService
      .getEmpleados()
      .subscribe((res) => {
        this.empleados = [...this.empleados, ...res];
      });
  }

  
  cambiarEstado(empleadoED: IEmpleado, estado: number) {

    if (estado == 8) {
      this.empleado.estado = 9;
      this.cambio = 'Inactivo';
    } else {
      this.empleado.estado = 8;
      this.cambio = 'Activo';
    }

    this.empleado.dui =  empleadoED.dui;

      Swal.fire({
        icon: 'question',
        title: "¿Cambiar el estado a " + this.cambio + "?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Cambiar",
        denyButtonText: `No cambiar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.empleadosService.cambiarEstado(empleadoED.dui).subscribe((resp: any) => {
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
            console.log(err);
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

}
