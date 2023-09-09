import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IProveedor } from "src/app/modules/proveedor/interfaces/proveedor.interface";
import { DevolucionValeService } from "../../services/devolucion-vale.service";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import {
  DECIMAL_VALIDATE,
  INTEGER_VALIDATE,
} from "src/app/constants/constants";
import Swal from "sweetalert2";

@Component({
  selector: "app-mostrar",
  templateUrl: "./mostrar.component.html",
  styleUrls: ["./mostrar.component.scss"],
})
export class MostrarComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  formularioGeneral: FormGroup;

  term: string = "";

  cantidad: number;
  total_monetario: number;
  tipoOpcion: number;

  cantidaGenerada: number;
  montoGenerado: number;

  private isNumber: string = DECIMAL_VALIDATE;
  private isInteger: string = INTEGER_VALIDATE;

  alerts = [
    {
      id: 1,
      type: "info",
      message:
        " Seleccione un tipo de movimiento y complete los campos obligatorios (*).",
      show: false,
    },
    {
      id: 2,
      type: "warning",
      message:
        " Tenga en cuenta que una vez registrada la devolución de los vales no podrá revertir la operación.",
      show: false,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private devolucionValeService: DevolucionValeService,
    private mensajesService: MensajesService
  ) {
    this.formularioGeneral = this.iniciarFormulario();
    this.formularioGeneral.get("total_monetario").disable();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Devolución de Vales" },
      { label: "Mostrar", active: true },
    ];
    this.devolucionValeService.getProveedor();
    this.devolucionValeService.getValesPorCantidad();
    this.devolucionValeService.getValesPorMonto();
  }

  private iniciarFormulario() {
    return this.fb.group({
      tipo: [1],
      proveedor: [null, [Validators.required]],
      cantidad: [
        "",
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(this.isInteger),
        ],
      ],
      total_monetario: [
        "",
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(this.isNumber),
        ],
      ],
    });
  }

  cambiartipo1() {
    this.formularioGeneral.get("total_monetario").disable();
    this.formularioGeneral.get("cantidad").enable();
    this.devolucionValeService.listVale = [];
  }
  cambiartipo0() {
    this.formularioGeneral.get("total_monetario").enable();
    this.formularioGeneral.get("cantidad").disable();
    this.devolucionValeService.listVale = [];
  }

  get listProveedor() {
    const proveedores: IProveedor[] = [];

    this.devolucionValeService.listProveedor.forEach((x) => {
      if (x.estado == 8 && x.tipo == 14) {
        proveedores.push(x);
      }
    });

    return proveedores;
  }

  get listDatos() {
    this.montoGenerado = this.cantidaGenerada = 0;
    this.devolucionValeService.listVale.forEach((x) => {
      this.montoGenerado += x.valor;
    });
    this.cantidaGenerada = this.devolucionValeService.listVale.length;
    return this.devolucionValeService.listVale;
  }

  async generarVales() {
    this.cantidad = this.formularioGeneral.get("cantidad").value;
    this.total_monetario = this.formularioGeneral.get("total_monetario").value;
    this.tipoOpcion = this.formularioGeneral.get("tipo").value;
    this.devolucionValeService.listVale = [];
    if (this.formularioGeneral.valid) {
      if (this.tipoOpcion == 1) {
        this.devolucionValeService.getValesPorCantidad(this.cantidad);
      } else {
        this.devolucionValeService.getValesPorMonto(this.total_monetario);
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

  async registrarDevolucion() {
    if (this.formularioGeneral.valid) {
      if ((await this.mensajesService.mensajesConfirmar("warning","¿Continuar con la acción?", "No se podrá revertir acción, digite: ", "devolver")) == true) {
        this.editando();
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

  editando() {
    const idproveedor = this.formularioGeneral.get("proveedor").value;
    console.log("Este es el proveedor: ", idproveedor);

    // Mostrar SweetAlert de carga
    Swal.fire({
      title: "Espere",
      text: "Realizando la acción...",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false,
      showConfirmButton: false,
    });

    this.devolucionValeService
      .modificarPorCantidad(this.listDatos, idproveedor)
      .subscribe({
        next: (resp: any) => {
          // Ocultar SweetAlert de carga
          Swal.close();
          this.mensajesService.mensajesToast(
            "success",
            "Acción completada con éxito"
          );
          this.limpiarCampos();
        },
        error: (err) => {
          // Ocultar SweetAlert de carga
          Swal.close();
          this.mensajesService.mensajesSweet(
            "error",
            "Ups... Algo salió mal",
            err
          );
        },
      });
  }

  limpiarCampos() {
    this.cantidad = null;
    this.total_monetario = null;
    this.cantidad = null;
    this.cantidaGenerada = null;
    this.montoGenerado = null;

    this.formularioGeneral.reset();
    this.formularioGeneral.get("tipo").patchValue(this.tipoOpcion);
    this.devolucionValeService.listVale = [];
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formularioGeneral.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }

  CambiarAlert(alert) {
    alert.show = !alert.show;
  }

  restaurarAlerts() {
    this.alerts.forEach((alert) => {
      alert.show = true;
    });
  }

  siMuestraAlertas() {
    return this.alerts.every((alert) => alert.show);
  }
}
