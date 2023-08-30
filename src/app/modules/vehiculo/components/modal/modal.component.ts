import { Component, Input, OnInit } from "@angular/core";
import { IVehiculos } from "../../interfaces/vehiculo-interface";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import { INTEGER_VALIDATE, STRING_VALIDATE, TEXTO_CARACTER_ESPECIAL } from "src/app/constants/constants";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  //entradas
  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() objVehiculo!: IVehiculos;

  //var
  formVehiculo!: FormGroup;
  private isInteger: string = INTEGER_VALIDATE;
  private isTexto: string = TEXTO_CARACTER_ESPECIAL;
  private isPalabra:string = STRING_VALIDATE ;

  //var para img
  public imgTemp: string | ArrayBuffer = null;
  private file!: File;
  imagen: string = "no hay";

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private mensajeService: MensajesService
  ) {
    this.formVehiculo = this.iniciarFormulario();
  }

  ngOnInit(): void {}

  iniciarFormulario(): FormGroup {
    return this.fb.group({
      placa: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      clase: ['', [Validators.required, Validators.pattern(this.isPalabra)]],
      color: ['',[Validators.required, Validators.pattern(this.isTexto)]],
      year: ['',[Validators.required, Validators.pattern(this.isInteger), this.yearValidator]],
      capacidad: ['',[Validators.required, Validators.min(1)]],
      ctanque: ['',[Validators.required]],
      chasis: ['',[Validators.required]],
      motor: ['', [Validators.required]],
      tipoGas: ['Diesel',[Validators.required]],
      file: ['',]
    });
  }

  yearValidator(control: FormControl) {
    const currentYear = new Date().getFullYear();
    const enteredYear = parseInt(control.value, 10);

    if (isNaN(enteredYear) || enteredYear > currentYear || enteredYear < currentYear - 50) {
      return { invalidYear: true };
    }

    return null;
  }

  openModal(content: any) {
    this.modalService.open(content, { size: "xl", centered: true });
  }

  guardar() {
    if (this.formVehiculo.valid) {
      if (this.objVehiculo != null) {
        //this.editando();
      } else {
        this.registrando();
      }
    } else {
      return Object.values(this.formVehiculo.controls)
      .forEach((control) => control.markAsTouched());
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];
    this.imagen = "seleccioanda";
    this.preVisualizarImagen(event);
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formVehiculo.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid' : validarCampo?.touched ? 'is-valid' : '';
  }

  registrando(){
    console.log("llega al registarra");

    this.mensajeService.mensajesToast("success", "Registro agregado");

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
