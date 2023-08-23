import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ServiceService } from '../Service/service.service';
import { SolicitudVv } from '../Interfaces/SolicitudVv';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitudvale',
  templateUrl: './solicitudvale.component.html',
  styleUrls: ['./solicitudvale.component.scss']
})
export class SolicitudvaleComponent implements OnInit {

  items = [
    { solicitante: 'Erik Manrique Flores', mision: 'Objetivo 1', estado: 'Aprobado', fechaDeUso: '05-07-2023', motorista: 'Roberto Nuila Mendoza' },
    { solicitante: 'Erik Manrique Flores', mision: 'Objetivo 2', estado: 'Por Aprobar', fechaDeUso: '05-07-2023', motorista: 'Edwin Alvarado Sanchez' },
    { solicitante: 'Erik Manrique Flores', mision: 'Objetivo 3', estado: 'En espera', fechaDeUso: '05-07-2023', motorista: 'Erik Manrique Flores' },
  ]; // Aquí deberías tener tus datos
  searchTerm = '';
  itemsPerPage = 5;
  currentPage = 1;

  filtroEstado: string = '';

  solicitud:any[]=[];

  solicitudvv:SolicitudVv[]=[];

  datosSolicitudV:SolicitudVv[]=[];

  searchText: string = '';

  formularioSolicitudVale: FormGroup;
  formularioSolicitudValev: FormGroup;

  constructor(private modalService: NgbModal, private service:ServiceService, public fb:FormBuilder) { 
      this.formularioSolicitudVale = fb.group({
      fechaSolicitud: new FormControl('',[Validators.required]),
      fechaEntrada: new FormControl('',[Validators.required]),
      fechaSalida: new FormControl('',[Validators.required]),
      tipo: new FormControl('',[Validators.required]),
      lugarMision: new FormControl('',[Validators.required]),
      estado: new FormControl('',[Validators.required]),
      motorista: new FormControl('',[Validators.required]),
      solicitante: new FormControl('',[Validators.required]),
      objetivoMision: new FormControl('',[Validators.required]),
      placa: new FormControl('',[Validators.required]),
      cantidadPersonas: new FormControl('',[Validators.required]),
      direccion: new FormControl('',[Validators.required]),
      unidadSolicitante: new FormControl('',[Validators.required]),
      nombreJefeDepto: new FormControl('',[Validators.required]),
    })
    this.formularioSolicitudValev = fb.group({
      cantidadVales: new FormControl('',[Validators.required]),
      fechaSolicitud: new FormControl('',[Validators.required]),
      fechaEntrada: new FormControl('',[Validators.required]),
      fechaSalida: new FormControl('',[Validators.required]),
      tipo: new FormControl('',[Validators.required]),
      lugarMision: new FormControl('',[Validators.required]),
      estado: new FormControl('',[Validators.required]),
      motorista: new FormControl('',[Validators.required]),
      solicitante: new FormControl('',[Validators.required]),
      objetivoMision: new FormControl('',[Validators.required]),
      placa: new FormControl('',[Validators.required]),
      cantidadPersonas: new FormControl('',[Validators.required]),
      direccion: new FormControl('',[Validators.required]),
      unidadSolicitante: new FormControl('',[Validators.required]),
      nombreJefeDepto: new FormControl('',[Validators.required]),
    })
  }
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Modals', active: true }];
    this.service.getCliente().subscribe((data:any)=>{
      this.solicitudvv=data;
      console.log(data);
    })
  }
 /**
   * Open Large modal
   * @param largeDataModal large modal data
   */
 largeModal(largeDataModal: any,solici:SolicitudVv) {
  this.modalService.open(largeDataModal, { size: 'lg', centered: true });
  console.log(solici)
      const fechaSolicitud = solici.fechaSolicitud;
      const fechaEntrada = solici.fechaEntrada;
      const fechaSalida = solici.fechaSalida;
      const tipo = solici.vehiculo.clase;
      const lugarMision = solici.lugarMision;
      const estado = solici.estado;
      const motorista = solici.motorista.nombre + ' ' + solici.motorista.apellido;
      const solicitante = solici.solicitante.empleado.nombre + ' ' + solici.solicitante.empleado.apellido;
      const objetivoMision = solici.objetivoMision;
      const placa = solici.horaEntrada;
      const cantidadPersonas = solici.cantidadPersonas;
      const direccion = solici.direccion;
      const unidadSolicitante = solici.unidadSolicitante;
      const nombreJefeDepto = solici.nombreJefeDepto;
      //modal de detalle de solicitud de vehiculo
      this.formularioSolicitudVale.get("fechaSolicitud")?.setValue(String(fechaSolicitud));
      this.formularioSolicitudVale.get("fechaEntrada")?.setValue(String(fechaEntrada));
      this.formularioSolicitudVale.get("fechaSalida")?.setValue(String(fechaSalida));
      this.formularioSolicitudVale.get("tipo")?.setValue(String(tipo));
      this.formularioSolicitudVale.get("lugarMision")?.setValue(String(lugarMision));
      this.formularioSolicitudVale.get("estado")?.setValue(String(estado));
      this.formularioSolicitudVale.get("motorista")?.setValue(String(motorista));
      this.formularioSolicitudVale.get("solicitante")?.setValue(String(solicitante));
      this.formularioSolicitudVale.get("objetivoMision")?.setValue(String(objetivoMision));
      this.formularioSolicitudVale.get("placa")?.setValue(String(placa));
      this.formularioSolicitudVale.get("tipo")?.setValue(String(tipo));
      this.formularioSolicitudVale.get("cantidadPersonas")?.setValue(String(cantidadPersonas));
      this.formularioSolicitudVale.get("direccion")?.setValue(String(direccion));
      this.formularioSolicitudVale.get("unidadSolicitante")?.setValue(String(unidadSolicitante));
      this.formularioSolicitudVale.get("nombreJefeDepto")?.setValue(String(nombreJefeDepto));
      //modal de solicitud de vale
      this.formularioSolicitudValev.get("fechaSolicitud")?.setValue(String(fechaSolicitud));
      this.formularioSolicitudValev.get("fechaEntrada")?.setValue(String(fechaEntrada));
      this.formularioSolicitudValev.get("fechaSalida")?.setValue(String(fechaSalida));
      this.formularioSolicitudValev.get("tipo")?.setValue(String(tipo));
      this.formularioSolicitudValev.get("lugarMision")?.setValue(String(lugarMision));
      this.formularioSolicitudValev.get("estado")?.setValue(String(estado));
      this.formularioSolicitudValev.get("motorista")?.setValue(String(motorista));
      this.formularioSolicitudValev.get("solicitante")?.setValue(String(solicitante));
      this.formularioSolicitudValev.get("objetivoMision")?.setValue(String(objetivoMision));
      this.formularioSolicitudValev.get("placa")?.setValue(String(placa));
      this.formularioSolicitudValev.get("tipo")?.setValue(String(tipo));
      this.formularioSolicitudValev.get("cantidadPersonas")?.setValue(String(cantidadPersonas));
      this.formularioSolicitudValev.get("direccion")?.setValue(String(direccion));
      this.formularioSolicitudValev.get("unidadSolicitante")?.setValue(String(unidadSolicitante));
      this.formularioSolicitudValev.get("nombreJefeDepto")?.setValue(String(nombreJefeDepto));
}

  filteredItems3() {
    const currentDate = new Date();
    return this.solicitudvv.filter(item =>
      ((item.solicitante.empleado.nombre+' '+item.solicitante.empleado.apellido).toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.lugarMision.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.estado.toLowerCase().includes(this.searchText.toLowerCase()) || 
     // item.fechaSalida.toLocaleDateString().includes(this.searchText.toLowerCase()) || 
      (item.motorista.nombre+' '+item.motorista.apellido).toLowerCase().includes(this.searchText.toLowerCase()) || 
      this.searchText === '') && 
      (item.estado === this.filtroEstado || this.filtroEstado === '')
    );
  }

  CargarDatos(sulici:SolicitudVv){
   // localStorage.setItem('id', JSON.stringify(clien));
   // this.router.navigate(["edit"]);
   }
  get paginatedItems() {
    if (!this.searchText) {
      return this.items;
    } else {
      return this.items.filter(item =>
        item.solicitante.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.mision.toString().includes(this.searchText) ||
        item.estado.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.solicitudvv);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'datos.xlsx');
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
    this.modalService.open(exlargeModal, { size: 'xl', centered: true });
  }

 
  /**
   * Open small modal
   * @param smallDataModal small modal data
   */
  smallModal(smallDataModal: any) {
    this.modalService.open(smallDataModal, { size: 'sm', centered: true });
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
    return this.items.filter(item =>
      item.solicitante.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }


}