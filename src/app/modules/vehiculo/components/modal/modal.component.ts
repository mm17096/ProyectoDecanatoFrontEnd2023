import { Component, Input, OnInit } from '@angular/core';
import { IVehiculos } from '../../interfaces/vehiculo-interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  //entradas
  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() objVehiculo!:IVehiculos;

  //var
  formVehiculo!:FormBuilder;

  //var para img
  public imgTemp: string | ArrayBuffer = null;
  private file!: File;
  imagen: string = 'no hay';

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  guardar(){

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
