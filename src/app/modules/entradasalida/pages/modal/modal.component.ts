
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NAME_VALIDATE } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { EntradaSalidaI, IEntradaSalida } from '../../interface/EntSalinterface';
import { Router } from '@angular/router';
import { ListaentradasalidaService } from '../../service/listaentradasalida.service';
import { MensajesService } from 'src/app/shared/global/mensajes.service';
import { IsolicitudVehiculo } from '../../interface/VehiculoEntradasalida';
import { ISolicitudvalep } from 'src/app/modules/solicitud-vale-paginacion/interface/solicitudvalep.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() leyenda!: string;
  @Input() leyendas!: string;
  @Input() titulo!: string;
  @Input() entradasalidaOd!: IEntradaSalida;
  @Input() salidaentradaOd!: boolean;
  @Input() objetivoMision: IsolicitudVehiculo;
  @Input() controllerdata: boolean;
  //objetivoMision="";
  fechaSalida = "";

  formBuilder!: FormGroup;
  //miFormulario: FormGroup;
  private isName: string = NAME_VALIDATE;
  entradasalidas: IEntradaSalida[] = [];//para almacenar los resultados
  entrasal: IEntradaSalida;
  solicitudvale: ISolicitudvalep
  horaActual: string;
  fechaActual: string;
  modoEdicion = false;

  /////esto para enviar el objetivo a la modal
  //objetivoMision: IsolicitudVehiculo;



  constructor(private modalService: NgbModal, private mensajesService: MensajesService, private fb: FormBuilder, private router: Router, private listaentradasalidaservice: ListaentradasalidaService) { }

  ngOnInit(): void {
    this.formBuilder = this.Iniciarformulario();
    if (!this.fechaActual) {
      this.fechaActual = this.getCurrentDate();
    }

    if (!this.horaActual) {
      this.horaActual = this.getCurrentTime();
    }
    this.listaentradasalidaservice.getMisiones();
  }




  // Función para obtener la fecha actual en formato "yyyy-MM-dd"
  getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  // Función para obtener la hora actual en formato "hh:mm"
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private Iniciarformulario(): FormGroup {
    return this.fb.group({
      id: [''],
      fecha: ['', [Validators.required, this.maxDateValidator()]],
      hora: ['', [Validators.required]],
      kilometraje: ['', [Validators.required]],
      combustible: ['', [Validators.required]],
      solicitudvehiculo: ['', [Validators.required]]
    });
  }
  //funcion para obtener la fecha actual.
  getToday(): Date {
    return new Date();
  }
  // Validador personalizado para la fecha
  maxDateValidator() {
    return (control) => {
      const selectedDate = new Date(control.value);
      const today = this.getToday();

      if (selectedDate > today) {
        return { maxDate: true };
      }

      return null;
    };
  }

  OnlyNumbersAllowed(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    const inputValue = event.target.value;
    const dotIndex = inputValue.indexOf('.');

    // Permitir números del 0 al 9
    if (charCode >= 48 && charCode <= 57) {
      // Verificar si ya existe un punto decimal en el campo
      if (dotIndex !== -1) {
        // Obtener la parte decimal después del punto
        const decimalPart = inputValue.substr(dotIndex + 1);
        // Permitir máximo dos decimales
        if (decimalPart.length >= 2) {
          console.log('Máximo dos decimales permitidos');
          return false;
        }
      }
      return true;
    } else if (charCode === 46 && dotIndex === -1) {
      // Permitir un único punto decimal si no existe uno ya en el campo
      return true;
    } else {
      console.log('charCode restricted is ' + charCode);
      return false;
    }
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lx', centered: true });
  }
  openModal1(conten: any) {
    this.modalService.open(conten, { size: 'lx', centered: true });
  }
  editando() {
    const ent = this.formBuilder.value;
    console.log(ent);

    this.listaentradasalidaservice.putEmpleado(ent).subscribe((resp: any) => {
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
        });

        Toast.fire({
          icon: 'success',
          text: 'Modificación exitosa'
        });

        this.formBuilder.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      this.mensajesService.mensajesSweet(
        "error",
        "Ups... Algo salió mal",
        err
      )
      this.obtenerLista();
      this.recargar();
    });
  }

  guardar() {
    if (this.formBuilder.valid) {
      if (this.entradasalidaOd != null) {
        //this.editando();
      } else {
        console.log("antes de registrar");
        this.registrando();
      }
    } else {
      Swal.fire({
        position: 'center',
        title: 'Faltan datos en el formuario',
        text: 'submit disparado, formulario no valido',
        icon: 'warning',
      });
    }
  }

  registrando() {
    const listando = this.formBuilder.value;
    console.log(this.controllerdata);
    if (!this.controllerdata) {
      const entsali: EntradaSalidaI = new EntradaSalidaI(listando.tipo, listando.fecha, listando.hora, listando.combustible, listando.kilometraje, 1, listando.solicitudvehiculo);
      this.listaentradasalidaservice.NuevosDatos(entsali).subscribe((resp: any) => {
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
          });
          Toast.fire({
            icon: 'success',
            text: 'Almacenamiento exitoso'
          });
          this.formBuilder.reset();
          this.recargar();
          this.modalService.dismissAll();
        }
      }, (err: any) => {
        this.mensajesService.mensajesSweet(
          "error",
          "Ups... Algo salió mal",
          err
        )
        this.obtenerLista();
        this.recargar();
      });
    } else {
      const entsali: EntradaSalidaI = new EntradaSalidaI(listando.tipo, listando.fecha, listando.hora, listando.combustible, listando.kilometraje, 2, listando.solicitudvehiculo);
      this.listaentradasalidaservice.NuevosDatos(entsali).subscribe((resp: any) => {
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
          });
          Toast.fire({
            icon: 'success',
            text: 'Almacenamiento exitoso'
          });
          this.formBuilder.reset();
          this.recargar();
          this.modalService.dismissAll();
        }
      }, (err: any) => {
        this.mensajesService.mensajesSweet(
          "error",
          "Ups... Algo salió mal",
          err
        )
        this.obtenerLista();
        this.recargar();
      });
    }
  }

  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  private obtenerLista() {//para poder mostrar e la tabla
    this.listaentradasalidaservice.ObtenerLista.subscribe((resp: IEntradaSalida[]) => {
      this.entradasalidas = resp;
    });
  }


  esCampoValido(campo: string) {

    const validarCampo = this.formBuilder.get(campo);
    /*if(campo=="solicitudvehiculo"){
      return 'is-valid';
    }*/


    return !validarCampo?.valid && validarCampo?.touched ? 'is-invalid' : validarCampo?.touched ? 'is-valid' : '';

  }

  get Listamisiones() {
    return this.listaentradasalidaservice.listDeMisiones;
  }



}
