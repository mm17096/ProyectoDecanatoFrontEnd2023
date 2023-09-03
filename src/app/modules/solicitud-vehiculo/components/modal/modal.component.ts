import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IPasajero, ISolicitudVehiculo} from "../../interfaces/data.interface";
import {SolicitudVehiculoService} from "../../services/solicitud-vehiculo.service";

import {map} from "rxjs/operators";
import Swal from "sweetalert2";
import {IPais} from "../../interfaces/pais.interface";
import {MensajesService} from "../../../../shared/global/mensajes.service";
import {IVehiculos} from "../../../vehiculo/interfaces/vehiculo-interface";
import {CommunicationService} from "../../services/comunicacion.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() leyenda!: string;
  @Input() estadoSelecionado!: number;
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
              private mensajesService: MensajesService, private communicationService: CommunicationService) { }

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

  async guardar(){
    if (this.formularioSoliVe.valid){
      if (this.soliVeOd != null){
        this.editarSoliVe();
      }else{
        if ((await this.mensajesService.mensajesConfirmar()) == true) {
          this.registrarSoliVe();
        }
      }
    } else {
      this.mensajesService.mensajesToast(
        "warning",
        "Complete los que se indican"
      );
      return Object.values(this.formularioSoliVe.controls).forEach((control) =>
        control.markAsTouched()
      );
    }
  }

  registrarSoliVe() : Promise<void> {
    const solicitudVehiculo = this.formularioSoliVe.value;

    // Crear un arreglo vacío para almacenar los datos de los pasajeros
    const pasajerosData = [];

    // Recorrer los controles de los pasajeros
    for (const control of this.pasajeroFormControls) {
      // Obtener el valor del control
      const nombrePasajero = control.value;

      // Crear un objeto con el valor del control y un ID vacío
      const pasajero = { id: '', nombrePasajero };

      // Agregar el objeto al arreglo de pasajerosData
      pasajerosData.push(pasajero);
    }

    solicitudVehiculo.listaPasajeros = pasajerosData;

    // Ahora, pasajerosData contendrá un arreglo con objetos en el formato deseado
    console.log("dataPas: ",pasajerosData);


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

    // Mostrar SweetAlert de carga
    const loadingAlert = Swal.fire({
      title: "Espere",
      text: "Realizando la acción...",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false,
      showConfirmButton: false,
    });

    //console.log(solicitudVehiculo);
    return new Promise<void> ((resolve, reject) => {
      this.soliVeService.registrarSoliVe(solicitudVehiculo).subscribe({
        next: (resp: any) => {
          Swal.close();
          this.soliVeService.getSolicitudesVehiculo(this.estadoSelecionado);
          this.mensajesService.mensajesToast("success", "Registro agregado");
          this.modalService.dismissAll();
          this.formularioSoliVe.reset();
          resolve();
        },
        error : (err) => {
          // Cerrar SweetAlert de carga
          Swal.close();
          this.mensajesService.mensajesSweet(
            "error",
            "Ups... Algo salió mal",
            err
          );
          reject(err); // Rechaza la promesa con el error
        },
      });
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
        pasajeros: this.fb.array([]),
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
        listaPasajeros: this.fb.array([])
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

    this.cantidadPersonas = this.formularioSoliVe.get('cantidadPersonas').value;
    const pasajerosArray = this.formularioSoliVe.get('listaPasajeros') as FormArray;

    // Calcula cuántas filas deberías tener
    const filasAAgregar = this.cantidadPersonas >= 2 && this.cantidadPersonas <= 5 ? this.cantidadPersonas - 1 : 0;

    if (this.cantidadPersonas <= 5) {
      // Si la cantidad actual es menor o igual a 5, elimina el último input si existe
      if (pasajerosArray.length > filasAAgregar) {
        pasajerosArray.removeAt(pasajerosArray.length - 1);
        this.pasajeroFormControls.pop();
      }

      // Agrega filas adicionales según la cantidad deseada
      while (pasajerosArray.length < filasAAgregar) {
        pasajerosArray.push(this.fb.group({
          id: [''], // Puedes inicializar estos valores como desees
          nombrePasajero: ['']
        }));

        // Agrega un nuevo FormControl al arreglo pasajeroFormControls
        this.pasajeroFormControls.push(new FormControl(''));
      }
    } else {
      // Si la cantidad de personas es mayor a 5, detén la generación de filas
      pasajerosArray.clear();
      this.pasajeroFormControls = [];
    }

    if (this.cantidadPersonas > 5) {
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
