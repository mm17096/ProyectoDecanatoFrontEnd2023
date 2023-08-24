import { Component, Input, OnInit } from "@angular/core";
import { IProveedor } from "../../interface/proveedor.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NUMBER_VALIDATE } from "src/app/constants/constants";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProveedorService } from "../../service/proveedor.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input() proveedor!: IProveedor;
  @Input() leyenda!: string;

  formularioGeneral: FormGroup;

  private isNumber: string = NUMBER_VALIDATE;
  private isDate: string = "";

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private proveedorService: ProveedorService
  ) {
    this.formularioGeneral = this.iniciarFormulario();
  }

  ngOnInit(): void {
    if (this.leyenda == "Editar") {
      this.formularioGeneral.patchValue(this.proveedor);
    }
  }

  private iniciarFormulario() {
    return this.fb.group({
      id: [""],
      nombre: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      telefono: ["", [Validators.required]],
      direccion: ["", [Validators.required]],
      email: ["", [Validators.required]],
    });
  }

  async guardar() {
    this;
    if (this.formularioGeneral.valid) {
      if (this.proveedor?.id) {
        //Modificar
        this.editando();
      } else {
        // Guardar
        this.registrando();
      }
    } else {
      this.proveedorService.mensajesToast(
        "warning",
        "Complete los que se indican"
      );
      return Object.values(this.formularioGeneral.controls).forEach((control) =>
        control.markAsTouched()
      );
    }
  }

  registrando() {
    const proveedor = this.formularioGeneral.value;
    this.proveedorService.guardar(proveedor).subscribe({
      next: (resp: any) => {
        console.log("PROVEEDOR AGREGADA");
        this.proveedorService.getProveedors();
        this.proveedorService.mensajesToast("success", "Registro agregado");
        this.modalService.dismissAll();
        this.limpiarCampos();
      },
      error: (err) => {
        this.proveedorService.mensajesSweet(
          "error",
          "Ups... Algo salió mal",
          err
        );
      },
    });
  }

  editando() {
    const proveedor = this.formularioGeneral.value;
    this.proveedorService.modificar(proveedor).subscribe({
      next: (resp: any) => {
        console.log("PROVEEDOR MODIFICADA");
        this.proveedorService.getProveedors();
        this.proveedorService.mensajesToast("success", "Registro modificado");
        this.modalService.dismissAll();
        this.limpiarCampos();
      },
      error: (err) => {
        this.proveedorService.mensajesSweet(
          "error",
          "Ups... Algo salió mal",
          err
        );
      },
    });
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formularioGeneral.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }

  limpiarCampos() {
    this.formularioGeneral.reset();
  }

  getClassOf() {
    if (this.leyenda == "Editar") {
      return "btn-dark btn-sm";
    } else {
      return "btn-primary";
    }
  }
  getIconsOf() {
    if (this.leyenda == "Editar") {
      return "<i class='bx bx-edit-alt'></i>";
    } else {
      return "Agregar";
    }
  }

  openModal(content: any, proveedor: IProveedor) {
    this.proveedor = proveedor;
    if (this.leyenda != "Editar") {
      this.limpiarCampos();
    }

    const modalOptions = {
      centered: true,
      size: "sm", // 'lg' para modal grande, 'sm' para modal pequeño
    };
    this.modalService.open(content, modalOptions);
  }
}
