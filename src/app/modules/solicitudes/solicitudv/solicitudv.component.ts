
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Consulta, Decano } from '../Interfaces/CompraVale/Consulta';
import { ExcelService } from '../Service/Excel/excel.service';
import { ConsultaService } from '../Service/Excel/consulta.service';
import { IConsultaExcelTabla, IConsultaExcelTablaC, IConsultaExcelTablaCompraDto, IConsultaExcelTablaDto } from '../Interfaces/CompraVale/excel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from "src/app/shared/global/mensajes.service";
import Swal from 'sweetalert2';
import { IExistenciaVales } from '../Interfaces/existenciavales.interface';
import { ServiceService } from '../Service/service.service';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';
import { SolicitudVehiculoService } from '../../solicitud-vehiculo/services/solicitud-vehiculo.service';
import { Usuario } from 'src/app/account/auth/models/usuario.models';


@Component({
  selector: "app-solicitudv",
  templateUrl: "./solicitudv.component.html",
  styleUrls: ["./solicitudv.component.scss"],
})
export class SolicitudvComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  consultaExcel:Consulta[]=[];
  fechaDesde:Date;
  fechaAsta:Date;
  formularioGeneral: FormGroup;
  resultado!: string;
  existenciaI: IExistenciaVales;
  dataExcel: IConsultaExcelTabla; 
  dataExcelC: IConsultaExcelTablaC;
  dataExcelConsulta: IConsultaExcelTablaDto;
  dataExcelCompra: IConsultaExcelTablaCompraDto;
  decano:Decano[];
  usuario: Usuario;
  veri: boolean = false;
  alerts = [
    {
      id: 1,
      type: "info",
      message:
        " Seleccione y complete los campos obligatorios (*).",
      show: false,
    },
  ];

  items = [
    {
      solicitante: "Erik Manrique Flores",
      objetivo: "Objetivo 1",
      estado: "Aprobado",
      fechaDeUso: "05-07-2023",
      cantidad: "5",
    },
    {
      solicitante: "Erik Manrique Flores",
      objetivo: "Objetivo 2",
      estado: "Por Aprobado",
      fechaDeUso: "05-07-2023",
      cantidad: "4",
    },
    {
      solicitante: "Erik Manrique Flores",
      objetivo: "Objetivo 3",
      estado: "En espera",
      fechaDeUso: "05-07-2023",
      cantidad: "8",
    },
  ]; // Aquí deberías tener tus datos
  searchTerm = "";
  itemsPerPage = 5;
  currentPage = 1;


  constructor(private modalService: NgbModal, 
    private excelService:ExcelService, 
    private consultaService: ConsultaService, 
    private fb:FormBuilder,
    private userService: UsuarioService,
    private soliVeService: SolicitudVehiculoService,
    private existenciaService: ServiceService,
    private mensajesService: MensajesService) {
    this.formularioGeneral = this.iniciarFormulario();
   }


  ngOnInit() {
    this.breadCrumbItems = [
      { label: "UI Elements" },
      { label: "Modals", active: true },
    ];
  }
  cacultaDecano(){
    this.consultaService.getConsultaDecano().subscribe({
      next: (response) => {
        this.decano = response;
       // console.log(this.existenciaI);
      },
     });
   }
  cargarConsulta(){
    this.consultaService.getConsultaExporExcel().subscribe((response)=>{
      this.dataExcel = response;

      });
  }
  cargarCompraDto(){
    this.consultaService.getConsultaCompraValeGDto(this.fechaDesde,this.fechaAsta).subscribe((consulta)=>{
      this.dataExcelCompra = consulta;
  });
  }

  cargarConsultaDto(){
    this.consultaService.getConsultaValeGDto(this.fechaDesde,this.fechaAsta).subscribe((consulta)=>{
      this.dataExcelConsulta = consulta;
     });
  }

  cargarCompraC(){
      this.consultaService.getCompraC().subscribe((response)=>{
        this.dataExcelC = response;
      });
  }

  obtnerExistenciaVales() {
    this.existenciaService.getCantidadVales().subscribe({
      next: (response) => {
        this.existenciaI = response;
       // console.log(this.existenciaI);
      },
    });
  }
  limpiarCamposFechas() {
    this.formularioGeneral.reset();
  }
  obtenerUsuarioActivo(){
    // Suscríbete al Observable para obtener el usuario
    this.consultaService.getEmpleado().subscribe((usuario) => {
      if(usuario.cargo.nombreCargo == "ASISTENTE FINANCIERA" || usuario.cargo.nombreCargo == "JEFE FINANCIERO" || usuario.cargo.nombreCargo == "ADMINISTRADOR"){
    this.cargarConsultaDto();
    this.cargarCompraDto();
    this.cacultaDecano();
    this.obtnerExistenciaVales();  
  //  this.download()
  if (this.formularioGeneral.valid) {
    const consulta = this.formularioGeneral.value;
    if(consulta.fechaDesde < consulta.fechaAsta){
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres general el excel?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, realizar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes colocar la lógica para realizar la acción
          // por ejemplo, eliminar un elemento o realizar alguna operación
          if(this.dataExcelConsulta != null && this.dataExcelCompra !=null){
          this.download();
          this.limpiarCamposFechas();
        }else{
          this.mensajesService.mensajesSweet(
            "warning",
            "Ups... Algo salió mal",
            "No hay datos para general el Excel'"
          );
        }
        } 
      });
    }else{
      this.mensajesService.mensajesSweet(
        "warning",
        "Ups... Algo salió mal",
        "El Campo 'Fecha Desde' debe ser menor a 'Fecha Hasta'"
      );
    }
}else{
  this.mensajesService.mensajesToast(
    "warning",
    "Complete los que se indican"
  );
  return Object.values(this.formularioGeneral.controls).forEach((control) =>
    control.markAsTouched()
  );
}
    }else{
      this.mensajesService.mensajesSweet(
        "warning",
        "Ups... ",
        "No tienes los permisos necesarios para esta acción'"
      );
    }
//console.log('usuario ',this.usuario.role)
    });
  //  console.log('usuario ',this.usuario)
  }
  
  download(): void{
    this.cargarConsultaDto();
    this.cargarCompraDto();
    this.cacultaDecano();
    this.obtnerExistenciaVales();
        this.excelService.dowloadExcel(this.existenciaI,this.dataExcelConsulta,this.dataExcelCompra,this.fechaDesde,this.fechaAsta,this.decano);
      
      

 }

private iniciarFormulario() {
  return this.fb.group({
    fechaDesde: [
      "",
      [
        Validators.required,
      ],
    ],
    fechaAsta: [
      "",
      [
        Validators.required,
      ],
    ],
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
   * Open Large modal
   * @param largeDataModal large modal data
   */
  largeModal(largeDataModal: any) {
    this.modalService.open(largeDataModal, { size: "lg", centered: true });
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

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.items
      .filter((item) =>
        item.solicitante.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .slice(startIndex, startIndex + this.itemsPerPage);
  }

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

  
  formatDate(date: Date): string {
    // Aquí puedes personalizar el formato de la fecha
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
