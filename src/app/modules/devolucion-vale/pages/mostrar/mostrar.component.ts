import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IProveedor } from "src/app/modules/proveedor/interfaces/proveedor.interface";
import { DevolucionValeService } from "../../services/devolucion-vale.service";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import {
  DECIMAL_VALIDATE,
  EMAIL_VALIDATE_UES,
  INTEGER_VALIDATE,
} from "src/app/constants/constants";
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IUsuarioRespuestaDto } from "../../interfaces/vale.interface";

@Component({
  selector: "app-mostrar",
  templateUrl: "./mostrar.component.html",
  styleUrls: ["./mostrar.component.scss"],
})
export class MostrarComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  formularioGeneral: FormGroup;
  proveedor?: IProveedor;

  formularioUsuario: FormGroup;
  @ViewChild("content") contentTemplate: any;
  public showPassword: boolean = false;
  usuarioRespuestaDto?: IUsuarioRespuestaDto;

  term: string = "";

  cantidad: number;
  total_monetario: number;
  tipoOpcion: number;

  cantidaGenerada: number;
  montoGenerado: number;

  private isNumber: string = DECIMAL_VALIDATE;
  private isInteger: string = INTEGER_VALIDATE;
  private isEmail: string = EMAIL_VALIDATE_UES;

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
    private mensajesService: MensajesService,
    private modalService: NgbModal
  ) {
    this.formularioGeneral = this.iniciarFormulario();
    this.formularioGeneral.get("total_monetario").disable();
    this.formularioUsuario = this.iniciarFormularioUsuario();
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Ajuste de Vale" },
      { label: "Mostrar", active: true },
    ];
    this.devolucionValeService.getProveedor();
    this.devolucionValeService.getValesPorCantidad();
    this.devolucionValeService.getValesPorMonto();
  }

  private iniciarFormularioUsuario() {
    return this.fb.group({
      nombre: ["", [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ["", [Validators.required, Validators.maxLength(50)]],
    });
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
      concepto: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(750),
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

  registrarDevolucion() {
    if (this.formularioGeneral.valid) {
      this.openModal(this.contentTemplate);
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

  validarUsuario() {
    const usuarioMardarDto = this.formularioUsuario.value;
    if (this.formularioUsuario.valid) {
      this.devolucionValeService.validarUsuario(usuarioMardarDto).subscribe({
        next: (resp: IUsuarioRespuestaDto) => {
          this.usuarioRespuestaDto = resp;
          this.editando();
        },
        error: (err) => {
          this.mensajesService.mensajesSweet(
            "error",
            "Ups... Algo salió mal",
            err.error.message
          );
        },
      });
    } else {
      this.mensajesService.mensajesToast(
        "warning",
        "Complete los que se indican"
      );
      return Object.values(this.formularioUsuario.controls).forEach((control) =>
        control.markAsTouched()
      );
    }
  }

  editando() {
    const concepto = this.formularioGeneral.get("concepto").value;
    this.proveedor = this.formularioGeneral.get("proveedor").value;

    const nuevoconcepto =
      "Ajuste a " +
      this.proveedor.nombre +
      ", autorizado por " +
      this.usuarioRespuestaDto.empleado.nombre +
      " " +
      this.usuarioRespuestaDto.empleado.apellido +
      " con cargo de " +
      this.usuarioRespuestaDto.empleado.cargo.nombreCargo +
      " en concepto de: " +
      concepto;

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
      .modificarPorCantidad(this.listDatos, nuevoconcepto)
      .subscribe({
        next: (resp: any) => {
          // Ocultar SweetAlert de carga
          Swal.close();
          this.mensajesService.mensajesSweet(
            "success",
            "Ajuste de vales completado",
            "Acción realizada por "+this.usuarioRespuestaDto.empleado.nombre +
            " " +
            this.usuarioRespuestaDto.empleado.apellido
          );
          this.limpiarCampos();
          this.modalService.dismissAll();
        },
        error: (err) => {
          // Ocultar SweetAlert de carga
          Swal.close();
          this.mensajesService.mensajesSweet(
            "error",
            "Ups... Algo salió mal",
            err.error.message
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

  esCampoValidoUsuario(campo: string) {
    const validarCampo = this.formularioUsuario.get(campo);
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

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openModal(content: any) {
    this.formularioUsuario.reset();
    const modalOptions = {
      centered: false,
      size: "sm", // 'lg' para modal grande, 'sm' para modal pequeño
      backdrop: "static" as "static",
      keyboard: false, // Configura backdrop como 'static'
    };
    this.modalService.open(content, modalOptions);
  }
}
