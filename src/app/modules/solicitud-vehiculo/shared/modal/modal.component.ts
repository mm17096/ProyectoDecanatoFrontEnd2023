import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() leyenda!: string;
  @Input() titulo!: string;

  formularioSoliVe!: FormGroup;
  pasajeros: any[] = [{ nombre: ''}];
  username: string = 'NombreDeUsuario';
  mostrarTabla: boolean = true;
  mostrarArchivoAdjunto: boolean = false;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(){
    this.formularioSoliVe = this.fb.group({
      fechaSolicitud: [this.obtenerFechaActual(new Date()), [Validators.required]],
      fechaSalida: ['', [Validators.required]],
      unidadSolicitante: ['', [Validators.required]],
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
  actualizarFilar() {
    let cantidadPersonas  = this.formularioSoliVe.get('cantidadPersonas').value;
    if (cantidadPersonas > this.pasajeros.length && this.pasajeros.length < 5){
      let cantidaFilasNuevas = cantidadPersonas - this.pasajeros.length;
      for (let i = 0; i < cantidaFilasNuevas; i++){
        this.pasajeros.push({ nombre: ''})
      }
    } else if (cantidadPersonas < this.pasajeros.length) {
      this.pasajeros.splice(cantidadPersonas);
    } else // Agregar la lógica para mostrar el campo de entrada de archivo si cantidadPersonas es mayor a 5
    if (cantidadPersonas > 5) {
      this.mostrarTabla = false; // Ocultar la tabla
      this.mostrarArchivoAdjunto = true; // Mostrar el campo de entrada de archivo
    } else {
      this.mostrarTabla = true; // Mostrar la tabla
      this.mostrarArchivoAdjunto = false; // Ocultar el campo de entrada de archivo
    }
  }
  handleFileChange(event: Event) {
    // Lógica para manejar el cambio de archivo
  }
}
