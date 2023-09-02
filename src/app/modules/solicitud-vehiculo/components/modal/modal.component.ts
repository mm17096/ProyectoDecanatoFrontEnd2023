import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IPasajero, ISolicitudVehiculo} from "../../interfaces/data.interface";
import {SolicitudVehiculoService} from "../../services/solicitud-vehiculo.service";

import {map} from "rxjs/operators";
import Swal from "sweetalert2";
import {IPais} from "../../interfaces/pais.interface";
import {MensajesService} from "../../../../shared/global/mensajes.service";
import {IVehiculos} from "../../../vehiculo/interfaces/vehiculo-interface";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() soliVeOd!: ISolicitudVehiculo;

  departamentos!: IPais[];
  municipios!: IPais[];
  distritos!: IPais[];
  cantones!: IPais[];

  placas!: IVehiculos[];

  formularioSoliVe!: FormGroup;
  pasajeros: IPasajero[] = [];
  username: string = 'Usuario que inicia';
  mostrarTabla: boolean = true;
  mostrarArchivoAdjunto: boolean = false;
  cantidadPersonas: number = 0;

  pasajeroFormControls: FormControl[] = [];


  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router,
              private soliVeService: SolicitudVehiculoService, public activeModal: NgbActiveModal,
              private mensajesService: MensajesService) { }

  ngOnInit(): void {
    console.log(this.leyenda);
    console.log(this.soliVeOd);
    this.iniciarFormulario();
    this.llenarComboDepartamentos();
    this.soliVeService.obtenerVehiculos();
    this.detalle(this.leyenda);
  }

  get listVehiculos() {
    return this.soliVeService.listVehiculos;
  }

  detalle(leyenda: string){
    if (leyenda == 'Detalle'){

      const solicitudVehiculo = this.soliVeOd;

      this.formularioSoliVe.get('fechaSolicitud')
        .setValue(this.soliVeOd != null ? this.soliVeOd.fechaSolicitud: '');
      this.formularioSoliVe.get('fechaSalida')
        .setValue(this.soliVeOd != null ? this.soliVeOd.fechaSalida: '');
      this.formularioSoliVe.get('unidadSolicitante')
        .setValue(this.soliVeOd != null ? this.soliVeOd.unidadSolicitante: '');
      this.formularioSoliVe.get('lugarMision')
        .setValue(this.soliVeOd != null ? this.soliVeOd.lugarMision: '');
      this.formularioSoliVe.get('depto')
        .setValue(this.soliVeOd != null ? this.soliVeOd.unidadSolicitante: '');
      this.formularioSoliVe.get('direccion')
        .setValue(this.soliVeOd != null ? this.soliVeOd.direccion: '');
      this.formularioSoliVe.get('fechaEntrada')
        .setValue(this.soliVeOd != null ? this.soliVeOd.fechaEntrada: '');
      this.formularioSoliVe.get('objetivoMision')
        .setValue(this.soliVeOd != null ? this.soliVeOd.objetivoMision: '');
      this.formularioSoliVe.get('tipoVehiculo')
        .setValue(this.soliVeOd != null ? this.soliVeOd.vehiculo.clase: '');
      this.formularioSoliVe.get('vehiculo')
        .setValue(this.soliVeOd != null ? this.soliVeOd.vehiculo.placa: '');
      this.formularioSoliVe.get('cantidadPersonas')
        .setValue(this.soliVeOd != null ? this.soliVeOd.cantidadPersonas: '');
      this.formularioSoliVe.get('horaSalida')
        .setValue(this.soliVeOd != null ? this.soliVeOd.horaSalida: '');
      this.formularioSoliVe.get('horaEntrada')
        .setValue(this.soliVeOd != null ? this.soliVeOd.horaEntrada: '');
      this.formularioSoliVe.get('solicitante')
        .setValue(this.soliVeOd != null ? this.soliVeOd.solicitante.empleado.nombre+' '
          + this.soliVeOd.solicitante.empleado.apellido: '');


      for (const persona of this.soliVeOd.listaPasajeros) {
        //console.log(persona);
        this.pasajeros.push({id: persona.id, nombrePasajero: persona.nombrePasajero});

        const control = new FormControl(this.soliVeOd != null ? persona.nombrePasajero : '');
        this.pasajeroFormControls.push(control);
      }
      console.log(this.pasajeros);
    }
  }

  guardar(){
    if (this.formularioSoliVe.valid){
      if (this.soliVeOd != null){
        this.editarSoliVe();
      }else{
        this.registrarSoliVe();
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

  registrarSoliVe() {
    const solicitudVehiculo = this.formularioSoliVe.value;

    /* para la direccion */
    let nombreDepartamento;
    let nombreMunicipio;
    let nombreDistrito;
    let nombreCanton;

    const codigoDepartamentoSeleccionado = this.formularioSoliVe.get('depto').value;
    const codigoMunicipioSeleccionado = this.formularioSoliVe.get('municipio').value;
    const codigoDistritoSeleccionado = this.formularioSoliVe.get('distrito').value;
    const codigoCantonSeleccionado = this.formularioSoliVe.get('canton').value;

    // Busca el objeto correspondiente al código seleccionado
    const departamentoSeleccionado = this.departamentos.find(
      dpt => dpt.codigo === codigoDepartamentoSeleccionado
    );
    const municipioSeleccionado = this.municipios.find(
      muni => muni.codigo === codigoMunicipioSeleccionado
    );
    const distritoSeleccionado = this.distritos.find(
      dist => dist.codigo === codigoDistritoSeleccionado
    );
    const cantonSeleccionado = this.cantones.find(
      ctn => ctn.codigo === codigoCantonSeleccionado
    );

    if (departamentoSeleccionado) {
      nombreDepartamento = departamentoSeleccionado.nam;
    }
    if (municipioSeleccionado){
      nombreMunicipio = municipioSeleccionado.nam;
    }
    if (distritoSeleccionado){
      nombreDistrito = distritoSeleccionado.nam;
    }
    if (cantonSeleccionado){
      nombreCanton = cantonSeleccionado.nam;
    }

    solicitudVehiculo.direccion = nombreDepartamento+', '+nombreMunicipio+', '+
    nombreDistrito+', '+nombreCanton;
    solicitudVehiculo.solicitante.codigoUsuario = '4937c750-13f7-4041-990a-f2de7fdf8cae';

    /* fin de la direccion */
    //console.log(solicitudVehiculo);
    this.soliVeService.registrarSoliVe(solicitudVehiculo).subscribe( (resp: any) => {
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

        this.formularioSoliVe.reset();
        this.listVehiculos;
        this.modalService.dismissAll();
      }
    },
      (err: any) => {
        this.mensajesService.mensajesSweet(
          "error",
          "Ups... Algo salió mal",
          err
        )
      });
  }


  editarSoliVe(){}

  cargarPlacas(tipoVehiculo: string) {
    this.soliVeService.filtroPlacasVehiculo(tipoVehiculo).subscribe(
      (vehiculosData: IVehiculos[]) => {
        if (vehiculosData && vehiculosData.length > 0) {
          this.placas = vehiculosData;
        } else {
          console.error('No se recibieron datos válidos de vehículos desde el backend.');
        }
      },
      (error: any) => {
        console.error('Error al obtener opciones de vehículos desde el backend:', error);
      }
    );
  }


  iniciarFormulario(){
    if (this.leyenda == 'Detalle' && this.soliVeOd != null){
      this.formularioSoliVe = this.fb.group({
        fechaSolicitud: [this.obtenerFechaActual(new Date()), []],
        fechaSalida: ['', []],
        fechaEntrada: ['', []],
        unidadSolicitante: ['Informática', []],
        tipoVehiculo: ['', []],
        vehiculo: ['', []],
        objetivoMision: ['', []],
        lugarMision: ['', []],
        direccion: [''],
        depto: ['', []],
        municipio: ['', []],
        distrito: ['', []],
        canton: ['', []],
        horaSalida: ['', []],
        horaEntrada: ['', []],
        cantidadPersonas: [1, [ Validators.min(1)]],
        nombre: ['', ],
        username: [[this.username],],
        solicitante: ['', []], // Aquí definimos el FormControl para codigoUsuario
        pasajeros: this.fb.array([])
      });
    }else{
      this.formularioSoliVe = this.fb.group({
        fechaSolicitud: [this.obtenerFechaActual(new Date()), []],
        fechaSalida: ['', []],
        fechaEntrada: ['', []],
        unidadSolicitante: ['Informática', []],
        tipoVehiculo: ['', []],
        vehiculo: ['', []],
        objetivoMision: ['', []],
        lugarMision: ['', []],
        direccion: [''],
        depto: ['', []],
        municipio: ['', []],
        distrito: ['', []],
        canton: ['', []],
        horaSalida: ['', []],
        horaEntrada: ['', []],
        cantidadPersonas: [1, [ Validators.min(1)]],
        nombre: ['', ],
        username: [[this.username],],
        solicitante: this.fb.group({
          codigoUsuario: ['', []]
        }),
        pasajeros: this.fb.array([])
      });
    }

  }

  //// metodo para validar el campo si es valido o no ////
  esCampoValido(campo: string) {
    const validarCampo = this.formularioSoliVe.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid' : validarCampo?.touched ? 'is-valid' : '';
  }

  obtenerFechaActual(date: Date): string {
    const year = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().
      padStart(2, '0');
    const dia = date.getDate().toString().
      padStart(2, '0');
    return `${year}-${mes}-${dia}`;
  }

  llenarComboDepartamentos(){
    // Reiniciar las selecciones y opciones para los selectores subsiguientes
    this.formularioSoliVe.get('depto').setValue(null);
    this.formularioSoliVe.get('municipio').setValue(null);
    this.formularioSoliVe.get('distrito').setValue(null);
    this.formularioSoliVe.get('canton').setValue(null);
    this.municipios = [];
    this.distritos = [];
    this.cantones = [];
    this.soliVeService.getDepa()
      .pipe(map((dp) => dp.filter((depa)=> depa.codigo.length === 2)))
      .subscribe((resp) => {
        this.departamentos = this.sortItemsByCodigo(resp);
      });
  }

  /**Cargar municipio segun dpto */
  deptoChange(id: string): void {

    this.formularioSoliVe.get('municipio').setValue(null);
    this.formularioSoliVe.get('distrito').setValue(null);
    this.formularioSoliVe.get('canton').setValue(null);
    this.municipios = [];
    this.distritos = [];
    this.cantones = [];

    // Obtener las opciones correspondientes al departamento seleccionado
    this.soliVeService.getDepa()
      .pipe(map(dp => dp.filter(muni => muni.codigo.startsWith(id) && muni.codigo.length === 4)))
      .subscribe(resp => {
        this.municipios = this.sortItemsByCodigo(resp);
      });
  }

  distChange(id: string): void {
    this.formularioSoliVe.get('distrito').setValue(null);
    this.formularioSoliVe.get('canton').setValue(null);
    this.distritos = [];
    this.cantones = [];

    // Obtener las opciones correspondientes al distrito seleccionado
    this.soliVeService.getDepa()
      .pipe(map(dp => dp.filter(disti => disti.codigo.startsWith(id) && disti.codigo.length === 6)))
      .subscribe(resp => {
        this.distritos = this.sortItemsByCodigo(resp);
      });
  }

  muniChange(id: string): void {
    this.formularioSoliVe.get('canton').setValue(null);
    this.cantones = [];

    // Obtener las opciones correspondientes al municipio seleccionado
    this.soliVeService.getDepa()
      .pipe(map(dp => dp.filter(canton => canton.codigo.startsWith(id) && canton.codigo.length === 8)))
      .subscribe(resp => {
        this.cantones = this.sortItemsByCodigo(resp);
        console.log(this.cantones)
      });
  }

  sortItemsByCodigo(items: any[]): any[] {
    return items.sort((a, b) => a.codigo.localeCompare(b.codigo));
  }


  // metodo para generar la filas de la tabla
  actualizarFilas() {
    this.cantidadPersonas  = this.formularioSoliVe.get('cantidadPersonas').value;

    if (this.cantidadPersonas > this.pasajeros.length && this.pasajeros.length < 4){
      let cantidaFilasNuevas = this.cantidadPersonas - this.pasajeros.length - 1;
      for (let i = 0; i < cantidaFilasNuevas; i++){
        this.pasajeros.push({id: "", nombrePasajero: ''});
      }
    } else if (this.cantidadPersonas < this.pasajeros.length) {
      this.pasajeros.splice(this.cantidadPersonas);
    }

    else if (this.cantidadPersonas > 5) {
      this.mostrarTabla = false; // Ocultar la tabla
      this.mostrarArchivoAdjunto = true; // Mostrar el campo de entrada de archivo
    } else {
      this.mostrarTabla = true; // Mostrar la tabla
      this.mostrarArchivoAdjunto = false; // Ocultar el campo de entrada de archivo
    }
  }

  // subir el archivo
  cambioDeArchivo(event: Event) {

  }
}
