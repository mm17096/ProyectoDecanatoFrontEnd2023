import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../service/empleado.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ICargo, IDepartamento, IEmpleado } from '../../interface/empleado.interface';

import { EMAIL_VALIDATE_UES, NAME_VALIDATE } from 'src/app/constants/constants';
import { MensajesService } from 'src/app/shared/global/mensajes.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() empleadOd!: IEmpleado;
  @Input() motoristaOd!: boolean;
  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() queryString: string;

  public imgTemp: string | ArrayBuffer = null;

  private isEmail: string = EMAIL_VALIDATE_UES;
  private isText: string = NAME_VALIDATE;

  cargos: ICargo[] = [];
  departamentos: IDepartamento[] = [];

  formBuilder!: FormGroup;

  esMotorista: boolean = false;
  private file!: File;

  imagen: string = 'no hay';

  hovered: boolean = false; // Inicializamos hovered como falso


  constructor(
    private empleadoService: EmpleadoService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private mensajesService: MensajesService
  ) {
    this.formBuilder = this.Iniciarformulario();
  }

  ngOnInit(): void {
    if (this.leyenda == "Editar") {
      this.formBuilder = this.Iniciarformulario();
    }

    this.empleadoService.getCargos();
    this.empleadoService.getDepartamentos();
  }

  private Iniciarformulario(): FormGroup {
    return this.fb.group({
      codigoEmpleado: [''],
      dui: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.pattern(this.isText)]],
      apellido: ['', [Validators.required, Validators.pattern(this.isText)]],
      telefono: ['', [Validators.required]],
      licencia: ['', this.motoristaOd ? [Validators.required] : []],
      tipolicencia: ['', this.motoristaOd ? [Validators.required] : []],
      fechalicencia: ['', this.motoristaOd ? [Validators.required] : []],
      jefe: [false, [Validators.required]],
      estado: [8],
      nombrefoto: [''],
      urlfoto: [''],
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      cargo: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
    });
  }

  ////////////// >>>>> metodos primarios <<<<<   /////////////

  //// metodo para obtener los cargos /////
  get Cargos() {
    return this.empleadoService.listCargos;
  }

  //// metodo para obtener los departamentos /////
  get Departamentos() {
    return this.empleadoService.listDepartamentos;
  }

  ////// metodo para tomar la desicion si es registro o actualizacion /////
  guardar() {
    if (this.formBuilder.valid) {
      if (this.empleadOd != null) {
        this.editando();
      } else {
        this.registrando();
      }
    } else {
      Swal.fire({
        position: 'center',
        title: 'Faltan datos en el formuario',
        text: 'Complete todos los campos requeridos',
        icon: 'warning',
      });
    }
  }

  /////////// metodo para registrar empleado ///////////
  registrando() {
    const empleado = this.formBuilder.value;
    if (this.imagen === 'no hay') {
      this.empleadoService.postEmpleado(empleado).subscribe((resp: any) => {
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
      });
    } else {

      this.empleadoService.postEmpleadoImagen(empleado, this.file).subscribe((resp: any) => {
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
      });
    }

  }

  ///////// metodo para editar empleado con imagen o sin imagen ///////
  editando() {
    const empleado = this.formBuilder.value;
    empleado.nombrefoto = this.empleadOd.nombrefoto;
    empleado.urlfoto = this.empleadOd.urlfoto;
    console.log(empleado);
    if (this.imagen === 'no hay') {
      this.empleadoService.putEmpleado(empleado).subscribe((resp: any) => {
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
      });
    } else {
      this.empleadoService.putEmpleadoImagen(empleado, this.file).subscribe((resp: any) => {
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
      });
    }
  }

  ////////////// >>>>> metodos secundarios de validacion y acciones  <<<<<   /////////////

  //// Metodo para validacion de fecha /////
  validarfecha() {
    const currentDate = new Date();
    const fechaString = this.formBuilder.get('fechalicencia').value; // Debe ser un string en formato 'yyyy-MM-dd'
    const fecha = new Date(fechaString);

    if (!isNaN(fecha.getTime())) {
      if (fecha <= currentDate) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'warning',
          text: 'Fecha invalida'
        });

        this.formBuilder.get('fechalicencia').setValue(null);
      }
    }
  }

  /////// metodo para modificacion de validaciones y estados cambiando el formulario a comveniencia si el empleado es motorista o no //////

  SelectCargo(newValue: string) {
    // Lógica para determinar si el cargo seleccionado es "Motorista"

    //obtenemos el objeto que tenga como nombreCargo Motorista
    const motoristaOb = this.Cargos.find(cargo => cargo.nombreCargo === "Motorista");
    //Comparamos que el ID sea igual al seleccionado y cambiamos la variable para mostrar los demas campos
    this.esMotorista = (this.formBuilder.get('cargo').value === motoristaOb.codigoCargo);
    this.motoristaOd = this.esMotorista;

    // Retrasamos la actualización del teléfono en 3 segundos
    setTimeout(() => {
      this.formBuilder.get('telefono').setValue(newValue); // Función para cambiar teléfono
    }, 50); // 1000 milisegundos = 1 segundos

    // Asignar o quitar validadores según el valor de esmotorista
    const licenciaControl = this.formBuilder.get('licencia');
    const tipolicenciaControl = this.formBuilder.get('tipolicencia');
    const fechalicenciaControl = this.formBuilder.get('fechalicencia');

    if (this.esMotorista) {
      licenciaControl.setValidators([Validators.required]);
      tipolicenciaControl.setValidators([Validators.required]);
      fechalicenciaControl.setValidators([Validators.required]);
    } else {
      licenciaControl.clearValidators();
      tipolicenciaControl.clearValidators();
      fechalicenciaControl.clearValidators();

      licenciaControl.setValue('');
      tipolicenciaControl.setValue('');
      fechalicenciaControl.setValue('');

      this.empleadOd.licencia = "";
      this.empleadOd.tipolicencia = "";
      this.empleadOd.fechalicencia = new Date();
    }
    licenciaControl.updateValueAndValidity();
    tipolicenciaControl.updateValueAndValidity();
    fechalicenciaControl.updateValueAndValidity();

  }

  //// metodo par abrir la modal ////
  openModal(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }


  ///// Metodo para recargar la pagina /////
  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  //// metodo para validar el campo si es valido o no ////
  esCampoValido(campo: string) {
    const validarCampo = this.formBuilder.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid' : validarCampo?.touched ? 'is-valid' : '';
  }

  ///// metodo que extrae la informacion de la imagen /////
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];
    this.imagen = 'seleccioanda';
    this.preVisualizarImagen(event);
  }

  ///// metodo para previsualizar la imagen /////
  preVisualizarImagen(event: any) {
    this.file = event.target.files[0];
    //cambia a imagen previa
    if (!this.file) {
      this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

}
