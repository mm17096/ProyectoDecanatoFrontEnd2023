import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ISolicitudVehiculo} from "../../interfaces/data.interface";
import {VehiculoService} from "../../../vehiculo/service/vehiculo.service";
import {IVehiculos} from "../../../vehiculo/interfaces/vehiculo-interface";
import {SolicitudVehiculoService} from "../../services/solicitud-vehiculo.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() soliVeOd!: ISolicitudVehiculo;
  vehiculos: IVehiculos[] = [];
  placasPorTipo = {};

  formularioSoliVe!: FormGroup;
  pasajeros: any[] = [];
  username: string = 'Usuario que inicia';
  mostrarTabla: boolean = true;
  mostrarArchivoAdjunto: boolean = false;
  cantidadPersonas: number = 0;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router,
              private soliVeService: SolicitudVehiculoService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.soliVeService.obtenerVehiculos();
  }

  get listVehiculos() {
    return this.soliVeService.listVehiculos;
  }

  cargarPlacas(tipoVehiculo: string) {
    const vehiculoSeleccionado = this.listVehiculos.find(vehiculo => vehiculo.clase === tipoVehiculo);
    this.formularioSoliVe.get('vehiculo')?.setValue(vehiculoSeleccionado?.placa || '');
  }

  iniciarFormulario(){
    this.formularioSoliVe = this.fb.group({
      fechaSolicitud: [this.obtenerFechaActual(new Date()), [Validators.required]],
      fechaSalida: ['', [Validators.required]],
      unidadSolicitante: ['Departamento de Informática', [Validators.required]],
      tipoVehiculo: ['', [Validators.required]],
      vehiculo: ['', [Validators.required]],
      objetivoMision: ['', [Validators.required]],
      lugarMision: ['', [Validators.required]],
      depto: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      distrito: ['', []],
      canton: ['', [Validators.required]],
      horaSalida: ['', [Validators.required]],
      horaRegreso: ['', [Validators.required]],
      cantidadPersonas: [1, [Validators.required, Validators.min(1)]],
      nombre: ['', ],
      username: [[this.username],],
      responsableName: ['', [Validators.required]],
    });
  }
  openModal(content: any) {
    this.modalService.open(content, {size: 'lg', backdrop: 'static'});
  }

  obtenerFechaActual(date: Date): string {
    const year = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().
      padStart(2, '0');
    const dia = date.getDate().toString().
      padStart(2, '0');
    return `${year}-${mes}-${dia}`;
  }

  // metodo para generar la filas de la tabla
  actualizarFilas() {
    this.cantidadPersonas  = this.formularioSoliVe.get('cantidadPersonas').value;

    if (this.cantidadPersonas > this.pasajeros.length && this.pasajeros.length < 4){
      let cantidaFilasNuevas = this.cantidadPersonas - this.pasajeros.length - 1;
      for (let i = 0; i < cantidaFilasNuevas; i++){
        this.pasajeros.push({ nombre: ''});
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
