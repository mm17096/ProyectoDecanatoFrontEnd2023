import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IPasajero, ISolicitudVehiculo} from "../../interfaces/data.interface";
import {SolicitudVehiculoService} from "../../services/solicitud-vehiculo.service";
import {IPais} from "../../interfaces/pais.interface";
import {map} from "rxjs/operators";

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

  formularioSoliVe!: FormGroup;
  pasajeros: IPasajero[] = [];
  username: string = 'Usuario que inicia';
  mostrarTabla: boolean = true;
  mostrarArchivoAdjunto: boolean = false;
  cantidadPersonas: number = 0;

  pasajeroFormControls: FormControl[] = [];


  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router,
              private soliVeService: SolicitudVehiculoService, public activeModal: NgbActiveModal) { }

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
      this.formularioSoliVe.get('horaRegreso')
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

  cargarPlacas(tipoVehiculo: string) {
    const vehiculoSeleccionado = this.listVehiculos.find(vehiculo => vehiculo.clase === tipoVehiculo);
    this.formularioSoliVe.get('vehiculo')?.setValue(vehiculoSeleccionado?.placa || '');
  }

  iniciarFormulario(){
    this.formularioSoliVe = this.fb.group({
      fechaSolicitud: [this.obtenerFechaActual(new Date()), [Validators.required]],
      fechaSalida: ['', [Validators.required]],
      fechaEntrada: ['', [Validators.required]],
      unidadSolicitante: ['Departamento de Informática', [Validators.required]],
      tipoVehiculo: ['', [Validators.required]],
      vehiculo: ['', [Validators.required]],
      objetivoMision: ['', [Validators.required]],
      lugarMision: ['', [Validators.required]],
      direccion: [''],
      depto: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      distrito: ['', []],
      canton: ['', [Validators.required]],
      horaSalida: ['', [Validators.required]],
      horaRegreso: ['', [Validators.required]],
      cantidadPersonas: [1, [Validators.required, Validators.min(1)]],
      nombre: ['', ],
      username: [[this.username],],
      solicitante: ['', [Validators.required]],
      pasajeros: this.fb.array([])
    });
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
