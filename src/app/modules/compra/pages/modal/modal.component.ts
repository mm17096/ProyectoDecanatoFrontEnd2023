import { Component, Input, OnInit } from "@angular/core";
import { ICompra } from "../../interface/compra.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompraService } from "../../service/compra.service";
import { INTEGER_VALIDATE, DECIMAL_VALIDATE } from "src/app/constants/constants";
import { MensajesService } from "src/app/shared/global/mensajes.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input() compra!: ICompra;
  @Input() leyenda!: string;

  formularioGeneral: FormGroup;

  private isNumber: string = DECIMAL_VALIDATE;
  private isInteger: string = INTEGER_VALIDATE;
  private isDate: string = "";

  cod_inicio?: number;
  cod_fin?: number;
  cantidad: number = 0;

  precio_unitario?: number;
  total_compra: number = 0;

  aplicarReadOnly: boolean = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private compraService: CompraService,
    private mensajesService: MensajesService
  ) {
    this.formularioGeneral = this.iniciarFormulario();
  }

  ngOnInit(): void {
    if (this.leyenda == "Editar") {
      this.cod_inicio = this.compra.cod_inicio;
      this.cod_fin = this.compra.cod_fin;
      this.precio_unitario = this.compra.precio_unitario;
      this.cantidad = this.compra.cantidad;
      this.total_compra = this.compra.total_compra;
      this.aplicarReadOnly = true;
      this.formularioGeneral.patchValue(this.compra);
      this.formularioGeneral.patchValue({
        proveedor: this.compra.proveedor.id,
      });
    }
    this.compraService.getProveedor();
  }

  private iniciarFormulario() {
    return this.fb.group({
      id: [""],
      factura: ["", [Validators.required]],
      proveedor: ["", [Validators.required]],
      descripcion: ["", [Validators.required, Validators.minLength(2)]],
      cantidad: [
        "",
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(this.isInteger),
        ],
      ],

      cod_inicio: [
        "",
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(this.isInteger),
        ],
      ],
      cod_fin: [
        "",
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(this.isInteger),
        ],
      ],
      fecha: ["", [Validators.required, Validators.pattern(this.isDate)]],
      precio_unitario: [
        "",
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(this.isNumber),
        ],
      ],
      total_compra: [
        "",
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(this.isNumber),
        ],
      ],
    });
  }

  get listProveedor() {
    return this.compraService.listProveedor;
  }

  getcantidad(): void {
    this.cod_inicio = this.formularioGeneral.get("cod_inicio").value;
    this.cod_fin = this.formularioGeneral.get("cod_fin").value;

    if (isNaN(this.cod_inicio) || isNaN(this.cod_fin)) {
      this.cantidad = null;
    } else if (this.cod_fin == null) {
      this.cantidad = null;
    } else {
      this.cantidad = this.cod_fin - this.cod_inicio;
    }
    this.formularioGeneral.controls["cantidad"].setValue(this.cantidad);
    this.getTotalCompra();
  }

  getTotalCompra(): void {
    this.precio_unitario = this.formularioGeneral.get("precio_unitario").value;
    if (isNaN(this.precio_unitario)) {
      this.total_compra = null;
    } else if (this.precio_unitario == null) {
      this.total_compra = null;
    } else {
      this.total_compra = this.precio_unitario * this.cantidad;
    }
    this.formularioGeneral.controls["total_compra"].setValue(this.total_compra);
  }

  async guardar() {
    this;
    if (this.formularioGeneral.valid) {
      if (this.compra?.id) {
        //Modificar
        this.editando();
      } else {
        if ((await this.mensajesService.mensajesConfirmar()) == true) {
          // Guardar
          this.registrando();
        }
      }
    } else {
      this.mensajesService.mensajesToast(
        "warning",
        "Complete los que se indican"
      );
      return Object.values(this.formularioGeneral.controls).forEach((control) =>
        control.markAsTouched()
      );
    }
  }

  registrando() {
    const compra = this.formularioGeneral.value;
    this.compraService.guardar(compra).subscribe({
      next: (resp: any) => {
        console.log("COMPRA AGREGADA");
        this.compraService.getCompras();
        this.mensajesService.mensajesToast("success", "Registro agregado");
        this.modalService.dismissAll();
        this.limpiarCampos();
      },
      error: (err) => {
        this.mensajesService.mensajesSweet(
          "error",
          "Ups... Algo salió mal",
          err
        );
      },
    });
  }

  editando() {
    const compra = this.formularioGeneral.value;
    this.compraService.modificar(compra).subscribe({
      next: (resp: any) => {
        console.log("COMPRA MODIFICADA");
        this.compraService.getCompras();
        this.mensajesService.mensajesToast("success", "Registro modificado");
        this.modalService.dismissAll();
        this.limpiarCampos();
      },
      error: (err) => {
        this.mensajesService.mensajesSweet(
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
    this.cod_inicio = null;
    this.cod_fin = null;
    this.cantidad = null;
    this.precio_unitario = null;
    this.total_compra = null;
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

  openModal(content: any, compra: ICompra) {
    this.compra = compra;
    if (this.leyenda != "Editar") {
      this.limpiarCampos();
    }

    const modalOptions = {
      centered: true,
      size: "lg", // 'lg' para modal grande, 'sm' para modal pequeño
    };
    this.modalService.open(content, modalOptions);
  }
}
