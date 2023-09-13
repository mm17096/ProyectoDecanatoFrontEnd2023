import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Consulta } from '../Interfaces/CompraVale/Consulta';
import { ExcelService } from '../Service/Excel/excel.service';
import { ConsultaService } from '../Service/Excel/consulta.service';
import { IConsultaExcelTabla } from '../Interfaces/CompraVale/excel';

@Component({
  selector: 'app-solicitudv',
  templateUrl: './solicitudv.component.html',
  styleUrls: ['./solicitudv.component.scss']
})
export class SolicitudvComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  consultaExcel:Consulta[]=[];

  items = [
    { solicitante: 'Erik Manrique Flores', objetivo: 'Objetivo 1', estado: 'Aprobado', fechaDeUso: '05-07-2023', cantidad: '5' },
    { solicitante: 'Erik Manrique Flores', objetivo: 'Objetivo 2', estado: 'Por Aprobado', fechaDeUso: '05-07-2023', cantidad: '4' },
    { solicitante: 'Erik Manrique Flores', objetivo: 'Objetivo 3', estado: 'En espera', fechaDeUso: '05-07-2023', cantidad: '8' },
  ]; // Aquí deberías tener tus datos
  searchTerm = '';
  itemsPerPage = 5;
  currentPage = 1;

  constructor(private modalService: NgbModal, private excelService:ExcelService, private consultaService: ConsultaService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Modals', active: true }];
  }
  download(): void{
  //  this.consultaService.getConsultaExporExcel().subscribe((response:IConsultaExcelTabla)=>{
    //this.excelService.dowloadExcel(response);
    this.excelService.dowloadExcel();
 // });
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
   * Open Large modal
   * @param largeDataModal large modal data
   */
  largeModal(largeDataModal: any) {
    this.modalService.open(largeDataModal, { size: 'lg', centered: true });
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


  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.filter(item =>
      item.solicitante.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice(startIndex, startIndex + this.itemsPerPage);
  }

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
