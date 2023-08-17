import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../service/empleado.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  //@Input() vehiculoOd!: IVehiculo;
  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() queryString: string;

  public imgTemp: string | ArrayBuffer = null;

/*   motoristas: IEmpleado[] = [];
  empleados: IEmpleado[] = [];

  motoristaS: IEmpleado;
  empleadoS: IEmpleado;
 */


  formBuilder!: FormGroup;
  // vehiculo: IVehiculo;
  //idempleado: string = '';
  empleado: string = 'Empleado';
  private file!: File;
  buttomtext: string = 'Guardar';
  imagen: string = 'no hay';


  constructor(private vehiculoService: EmpleadoService, private modalService: NgbModal, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.buttomtext = 'Modificar';
/*     if (this.vehiculoOd != null) {
      if (this.vehiculoOd.tipo === 'Camión') {
        this.empleado = "Acompañante";
      } else {
        this.empleado = "Vigilante";
      }
      // Cambia el texto del botón
      this.buttomtext = 'Modificar';

      //inicializar los objetos modificacion y formulario
      this.formBuilder = this.IniciarformularioMod();
      this.vehiculo = {
        idVehiculo: this.vehiculoOd.idVehiculo,
        tipo: this.vehiculoOd.tipo,
        nombrefoto: this.vehiculoOd.nombrefoto,
        urlfoto: this.vehiculoOd.urlfoto,
        estado: this.vehiculoOd.estado,
        motorista: this.vehiculoOd.motorista,
        empleado: this.vehiculoOd.empleado
      };

    } else {
      //inicializar los objetos agregar nuevo y formulario
      this.formBuilder = this.IniciarformularioNuevo();

      this.vehiculo = {
        idVehiculo: 0,
        tipo: '',
        nombrefoto: '',
        urlfoto: '',
        estado: 'Activo',
        motorista: null,
        empleado: null
      };

      this.motoristaS = {
        idEmpleado: 0,
        tipo: '',
        nombre: ''
      };

      this.empleadoS = {
        idEmpleado: 0,
        tipo: '',
        nombre: ''
      };
    } */

    this.getMotorista();
    this.getEmpleados();
  }

  private IniciarformularioMod(): FormGroup {
    return this.fb.group({
      file: [''],
      tipo: ['', [Validators.required]],
      motorista: [''],
      empleado: ['']
    });
  }

  private IniciarformularioNuevo(): FormGroup {
    return this.fb.group({
      file: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      motorista: ['', [Validators.required]],
      empleado: ['', [Validators.required]]
    });
  }

  getMotorista() {
/*     this.vehiculoService
      .getMotoristas()
      .subscribe((res) => {
        //console.log(res);
        this.motoristas = [...this.motoristas, ...res];
      }); */
  }

  getEmpleados() {
/*     this.empleados = [];

    if (this.empleado === 'Vigilante') {
      this.vehiculoService
        .getVigilante()
        .subscribe((res) => {
          //console.log(res);
          this.empleados = [...this.empleados, ...res];
        });
    } else {
      this.vehiculoService
        .getAcompaniante()
        .subscribe((res) => {
          //console.log(res);
          this.empleados = [...this.empleados, ...res];
        });
    } */

  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  guardar() {
   /*  if (this.formBuilder.valid) {
      if (this.vehiculoOd != null) {
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
    } */
  }

  registrando() {
    const selectedTipo = this.formBuilder.get('tipo').value;
    const selectedMtorista = this.formBuilder.get('motorista').value;
    const selectedEmpleado = this.formBuilder.get('empleado').value;

    //console.log(selectedTipo);

/*     this.motoristaS.idEmpleado = selectedMtorista;
    this.empleadoS.idEmpleado = selectedEmpleado;

    this.vehiculo.tipo = selectedTipo;
    this.vehiculo.motorista = this.motoristaS;
    this.vehiculo.empleado = this.empleadoS;
 */
   /*  this.vehiculoService.setVehiculo(this.vehiculo, this.file).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos guardados con exito',
          icon: 'info',
        });
        this.formBuilder.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo paso, hable con el administrador',
      });
    }); */

  }

  SelectTipo() {
    const selectedTipo = this.formBuilder.get('tipo').value;

    if (selectedTipo === 'Rastra') {
      this.empleado = "Vigilante";
      this.getEmpleados();
    } else {
      this.empleado = "Acompañante";
      this.getEmpleados();
    }
  }

  editando() {

/*     const selectedTipo = this.formBuilder.get('tipo').value;
    const selectedMtorista = this.formBuilder.get('motorista').value;
    const selectedEmpleado = this.formBuilder.get('empleado').value;

    this.vehiculo.tipo = selectedTipo;

    if (selectedMtorista) {
      this.vehiculo.motorista.idEmpleado = selectedMtorista;
    }

    if (selectedEmpleado) {
      this.vehiculo.empleado.idEmpleado = selectedEmpleado;
    } */

   /*  if (this.imagen === 'no hay') {
      this.vehiculoService.ModVehiculoSinImagen(this.vehiculo).subscribe((resp: any) => {
        if (resp) {
          console.log(resp);
          Swal.fire({
            position: 'center',
            title: 'Buen trabajo',
            text: 'Datos modificados con exito',
            icon: 'info',
          });
          this.formBuilder.reset();
          this.recargar();
          this.modalService.dismissAll();
        }
      }, (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Algo paso, hable con el administrador',
        });
      });
    } else {

      this.vehiculoService.ModVehiculoImagen(this.vehiculo, this.file).subscribe((resp: any) => {
        if (resp) {
          console.log(resp);
          Swal.fire({
            position: 'center',
            title: 'Buen trabajo',
            text: 'Datos guardados con exito',
            icon: 'info',
          });
          this.formBuilder.reset();
          this.recargar();
          this.modalService.dismissAll();
        }
      }, (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Algo paso, hable con el administrador',
        });
      });
    } */

  }

  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }


  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];
    this.imagen = 'seleccioanda';
    this.preVisualizarImagen(event);
  }

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
