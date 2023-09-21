import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ServiceService } from "../Service/service.service";
import { SolicitudVv } from "../Interfaces/SolicitudVv";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  IExistenciaVales,
  ISolicitudValeID,
} from "../Interfaces/existenciavales.interface";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import Swal from "sweetalert2";
import {
  IAsignacionVale,
  IValesAsignar,
  ICodigoAsignacion,
} from "../Interfaces/asignacionvale.interface";
import { NUMBER_VALIDATE } from "src/app/constants/constants";
import { Router } from "@angular/router";
import { ISolicitudValeAprobar } from '../Interfaces/solicitudValeAprobar.interface';

@Component({
  selector: "app-solicitudvale",
  templateUrl: "./solicitudvale.component.html",
  styleUrls: ["./solicitudvale.component.scss"],
})
export class SolicitudvaleComponent implements OnInit {
  items = [
    {
      solicitante: "Erik Manrique Flores",
      mision: "Objetivo 1",
      estado: "Aprobado",
      fechaDeUso: "05-07-2023",
      motorista: "Roberto Nuila Mendoza",
    },
    {
      solicitante: "Erik Manrique Flores",
      mision: "Objetivo 2",
      estado: "Por Aprobar",
      fechaDeUso: "05-07-2023",
      motorista: "Edwin Alvarado Sanchez",
    },
    {
      solicitante: "Erik Manrique Flores",
      mision: "Objetivo 3",
      estado: "En espera",
      fechaDeUso: "05-07-2023",
      motorista: "Erik Manrique Flores",
    },
  ]; // Aquí deberías tener tus datos
  searchTerm = "";
  itemsPerPage = 5;
  currentPage = 1;
  busqueda: string = "";
  p: any;
  private isNumber: string = NUMBER_VALIDATE;

  filtroEstado: string = "";

  solicitud: any[] = [];

  solicitudvv: SolicitudVv[] = [];

  valesAsingar!: IValesAsignar;

  asignacionVale!: IAsignacionVale;

  solcitudVale: SolicitudVv;

  codigoAsignacion: ICodigoAsignacion;

  public paramAsignacion: string = "";

  public paramSolicitudV!: string;

  datosSolicitudV: SolicitudVv[] = [];

  codigoSolicitudVehiculo: string = "";

  codigoSolicitudVale!: ISolicitudValeID;

  searchText: string = "";

  formularioSolicitudVale: FormGroup;
  formularioSolicitudValev: FormGroup;
  existenciaI!: IExistenciaVales;
  term: any; // para buscar

  breadCrumbItems: Array<{}>;



  constructor(
    private modalService: NgbModal,
    private service: ServiceService,
    public fb: FormBuilder,
    private existenciaService: ServiceService,
    private mensajesService: MensajesService,
    private router: Router
  ) {
    this.formularioSolicitudVale = fb.group({
      cantidadVales: new FormControl("", [
        Validators.required,
        Validators.pattern(this.isNumber),
      ]),
      fechaSolicitud: new FormControl("", [Validators.required]),
      fechaEntrada: new FormControl("", [Validators.required]),
      fechaSalida: new FormControl("", [Validators.required]),
      tipo: new FormControl("", [Validators.required]),
      lugarMision: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      motorista: new FormControl("", [Validators.required]),
      solicitante: new FormControl("", [Validators.required]),
      objetivoMision: new FormControl("", [Validators.required]),
      placa: new FormControl("", [Validators.required]),
      cantidadPersonas: new FormControl("", [Validators.required]),
      direccion: new FormControl("", [Validators.required]),
      unidadSolicitante: new FormControl("", [Validators.required]),
      nombreJefeDepto: new FormControl("", [Validators.required]),
    });
    this.formularioSolicitudValev = fb.group({
      cantidadVales: new FormControl("", [Validators.required]),
      fechaSolicitud: new FormControl("", [Validators.required]),
      fechaEntrada: new FormControl("", [Validators.required]),
      fechaSalida: new FormControl("", [Validators.required]),
      tipo: new FormControl("", [Validators.required]),
      lugarMision: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
      motorista: new FormControl("", [Validators.required]),
      solicitante: new FormControl("", [Validators.required]),
      objetivoMision: new FormControl("", [Validators.required]),
      placa: new FormControl("", [Validators.required]),
      cantidadPersonas: new FormControl("", [Validators.required]),
      direccion: new FormControl("", [Validators.required]),
      unidadSolicitante: new FormControl("", [Validators.required]),
      nombreJefeDepto: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Solicitud de Vales" },
      { label: "Mis Solicitudes", active: true },
    ]; // miga de pan
    this.service.getCliente().subscribe((data: any) => {
      this.solicitudvv = data.content;
      console.log(this.solicitudvv);
    });
    this.obtnerExistenciaVales();
  }

  //Obtniene los vales a asignar según la cantidad deseada
  valesAsignar(valesAsignarModal: any) {
    const cantidadVales =
      this.formularioSolicitudValev.get("cantidadVales")?.value;
    this.service.getValesAignar(cantidadVales).subscribe({
      next: (response) => {
        this.valesAsingar = response;
        console.log(this.valesAsingar);
      },
    });
    console.log(this.valesAsingar);
    this.modalService.open(valesAsignarModal, { size: "lg", centered: true });
  }

  //Obtitne la existencia de los vales
  obtnerExistenciaVales() {
    this.existenciaService.getCantidadVales().subscribe({
      next: (response) => {
        this.existenciaI = response;
        console.log(this.existenciaI);
      },
    });
  }

  //Liquida los valos y finaliza las solicitudes
  liquidarVales(solicitudVehiculo: SolicitudVv) {
    console.log(
      "el codigo del vehiculo es: " + solicitudVehiculo.codigoSolicitudVehiculo
    );
    console.log(
      this.obtenerIdSolicitudVale(solicitudVehiculo.codigoSolicitudVehiculo)
    );
  }

  //Obtiene el id de la solicitud de vale
  obtenerIdSolicitudVale(codigoSolicitudVehiculo: string) {
    this.service.getIdSolicitudVale(codigoSolicitudVehiculo).subscribe({
      next: (response) => {
        this.codigoSolicitudVale = response;

        this.paramSolicitudV = this.codigoSolicitudVale.codigoSolicitudVale;
        console.log("el método, codigoSolicitudVale:", this.paramSolicitudV);
        this.obtenerCodigoAsignacion(this.paramSolicitudV);
      },
    });
  }

  //Obtiene el código de asignación
  obtenerCodigoAsignacion(codigoSolitudVale: string) {
    //this.obtenerIdSolicitudVale(this.solicitudvv.codigoSolicitudVehiculo)
    this.service.getCodigoAsignacion(codigoSolitudVale).subscribe({
      next: (response) => {
        this.codigoAsignacion = response;
        this.paramAsignacion = this.codigoAsignacion.codigoAsignacion;
        console.log("metodo, códigoAsignacion: ", this.paramAsignacion);
        this.router.navigate(["/asignacion-vale/asignacion", this.paramAsignacion]);
      },
    });

  }

  /**
   * Open Large modal
   * @param largeDataModal large modal data
   */
  largeModal(largeDataModal: any, solici: SolicitudVv) {
    //esto es para obtener el id de la solicitud de vale
    this.codigoSolicitudVehiculo = solici.codigoSolicitudVehiculo;
    this.obtenerIdSolicitudVale(this.codigoSolicitudVehiculo);

    this.modalService.open(largeDataModal, { size: "lg", centered: true });
    console.log(solici);
    const fechaSolicitud = solici.fechaSolicitud;
    const fechaEntrada = solici.fechaEntrada;
    const fechaSalida = solici.fechaSalida;
    const tipo = solici.vehiculo.clase;
    const lugarMision = solici.lugarMision;
    const estado = solici.estado;
    const motorista = solici.motorista.nombre + " " + solici.motorista.apellido;
    const solicitante =
      solici.solicitante.empleado.nombre +
      " " +
      solici.solicitante.empleado.apellido;
    const objetivoMision = solici.objetivoMision;
    const placa = solici.horaEntrada;
    const cantidadPersonas = solici.cantidadPersonas;
    const direccion = solici.direccion;
    const unidadSolicitante = solici.unidadSolicitante;
    const nombreJefeDepto = solici.nombreJefeDepto;
    //modal de detalle de solicitud de vehiculo
    this.formularioSolicitudVale
      .get("fechaSolicitud")
      ?.setValue(String(fechaSolicitud));
    this.formularioSolicitudVale
      .get("fechaEntrada")
      ?.setValue(String(fechaEntrada));
    this.formularioSolicitudVale
      .get("fechaSalida")
      ?.setValue(String(fechaSalida));
    this.formularioSolicitudVale.get("tipo")?.setValue(String(tipo));
    this.formularioSolicitudVale
      .get("lugarMision")
      ?.setValue(String(lugarMision));
    this.formularioSolicitudVale.get("estado")?.setValue(String(estado));
    this.formularioSolicitudVale.get("motorista")?.setValue(String(motorista));
    this.formularioSolicitudVale
      .get("solicitante")
      ?.setValue(String(solicitante));
    this.formularioSolicitudVale
      .get("objetivoMision")
      ?.setValue(String(objetivoMision));
    this.formularioSolicitudVale.get("placa")?.setValue(String(placa));
    this.formularioSolicitudVale.get("tipo")?.setValue(String(tipo));
    this.formularioSolicitudVale
      .get("cantidadPersonas")
      ?.setValue(String(cantidadPersonas));
    this.formularioSolicitudVale.get("direccion")?.setValue(String(direccion));
    this.formularioSolicitudVale
      .get("unidadSolicitante")
      ?.setValue(String(unidadSolicitante));
    this.formularioSolicitudVale
      .get("nombreJefeDepto")
      ?.setValue(String(nombreJefeDepto));
    //modal de solicitud de vale
    this.formularioSolicitudValev
      .get("fechaSolicitud")
      ?.setValue(String(fechaSolicitud));
    this.formularioSolicitudValev
      .get("fechaEntrada")
      ?.setValue(String(fechaEntrada));
    this.formularioSolicitudValev
      .get("fechaSalida")
      ?.setValue(String(fechaSalida));
    this.formularioSolicitudValev.get("tipo")?.setValue(String(tipo));
    this.formularioSolicitudValev
      .get("lugarMision")
      ?.setValue(String(lugarMision));
    this.formularioSolicitudValev.get("estado")?.setValue(String(estado));
    this.formularioSolicitudValev.get("motorista")?.setValue(String(motorista));
    this.formularioSolicitudValev
      .get("solicitante")
      ?.setValue(String(solicitante));
    this.formularioSolicitudValev
      .get("objetivoMision")
      ?.setValue(String(objetivoMision));
    this.formularioSolicitudValev.get("placa")?.setValue(String(placa));
    this.formularioSolicitudValev.get("tipo")?.setValue(String(tipo));
    this.formularioSolicitudValev
      .get("cantidadPersonas")
      ?.setValue(String(cantidadPersonas));
    this.formularioSolicitudValev.get("direccion")?.setValue(String(direccion));
    this.formularioSolicitudValev
      .get("unidadSolicitante")
      ?.setValue(String(unidadSolicitante));
    this.formularioSolicitudValev
      .get("nombreJefeDepto")
      ?.setValue(String(nombreJefeDepto));
  }



  //Guardar la asignación de vales
  async guardar() {
    if (this.formularioSolicitudValev.valid) {
      if ((await this.mensajesService.mensajeAsignar()) == true) {
        // Guardar
        this.registrando();
      }
    } else {
      this.mensajesService.mensajesToast(
        "warning",
        "Complete los que se indican"
      );
      return Object.values(this.formularioSolicitudValev.controls).forEach(
        (control) => control.markAsTouched()
      );
    }
  }

  //Regitra la asignación de los vales
  registrando() {
    //Asignaré los campos necesario para guardar la asignación
    const cantidadVales =
      this.formularioSolicitudValev.get("cantidadVales")?.value;

    const estadoAsignacion = 8;
    new Date().toLocaleDateString();
    const fechaAsignacion = this.obtenerFechaConFormato();

    const asignarVales: IAsignacionVale = {
      estadoAsignacion: estadoAsignacion,
      fechaAsignacion: fechaAsignacion,
      solicitudVale: this.codigoSolicitudVale.codigoSolicitudVale,
      cantidadVales: cantidadVales,
    };

    console.log(asignarVales);

    Swal.fire({
      title: "Espere",
      text: "Realizando la acción...",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: false,
      showConfirmButton: false,
    });
    return new Promise<void>((resolve, reject) => {
      this.service.insertar(asignarVales).subscribe({
        next: (resp: any) => {
          // Cerrar SweetAlert de carga
          Swal.close();
          this.mostrar();
          this.modalService.dismissAll();
          this.limpiarCampos();
          this.mensajesService.mensajesToast("success", "Vales Asignados");
          resolve(); // Resuelve la promesa sin argumentos
        },
        error: (err) => {
          // Cerrar SweetAlert de carga
          Swal.close();
          this.mensajesService.mensajesSweet(
            "error",
            "Ups... Algo salió mal",
            err.error.message
          );
          reject(err); // Rechaza la promesa con el error
        },
      });
    });
  }
  limpiarCampos() {
    this.formularioSolicitudVale.reset();
  }
  filteredItems3() {
    const currentDate = new Date();
    //console.log(this.solicitudvv)
    return this.solicitudvv.filter(
      (item) =>
        ((
          item.solicitante.empleado.nombre +
          " " +
          item.solicitante.empleado.apellido
        )
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
          item.lugarMision
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          item.estadoString
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          // item.fechaSalida.toLocaleDateString().includes(this.searchText.toLowerCase()) ||
          (item.motorista.nombre + " " + item.motorista.apellido)
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          this.searchText === "") &&
        (item.estadoString === this.filtroEstado || this.filtroEstado === "")
    );
  }

  CargarDatos(sulici: SolicitudVv) {
    // localStorage.setItem('id', JSON.stringify(clien));
    // this.router.navigate(["edit"]);
  }

  mostrar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  get paginatedItems() {
    if (!this.searchText) {
      return this.items;
    } else {
      return this.items.filter(
        (item) =>
          item.solicitante
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          item.mision.toString().includes(this.searchText) ||
          item.estado.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.solicitudvv
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data: Blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "datos.xlsx");
  }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }

  /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */
  extraLarge(exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: "xl", centered: true });
  }

  /**
   * Open small modal
   * @param smallDataModal small modal data
   */
  smallModal(smallDataModal: any) {
    this.modalService.open(smallDataModal, { size: "sm", centered: true });
  }

  /**
   * Open center modal
   * @param centerDataModal center modal data
   */
  centerModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { centered: true });
  }

  /**
   * Open scroll modal
   * @param scrollDataModal scroll modal data
   */
  scrollModal(scrollDataModal: any) {
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  /* get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.filter(item =>
      item.solicitante.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice(startIndex, startIndex + this.itemsPerPage);
  }*/

  get pageNumbers() {
    return Array(Math.ceil(this.filteredItems.length / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  get filteredItems() {
    return this.items.filter((item) =>
      item.solicitante.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  obtenerFechaConFormato(): string {
    const fecha = new Date();

    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // +1 porque enero es 0
    const día = fecha.getDate().toString().padStart(2, "0");

    const fechaFormateada = `${año}-${mes}-${día}`;

    return fechaFormateada;
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formularioSolicitudValev.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }
}
