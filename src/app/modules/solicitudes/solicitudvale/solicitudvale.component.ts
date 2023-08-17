import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

  searchText: string = '';

  constructor(private modalService: NgbModal) { }
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Modals', active: true }];
  }

  filteredItems3() {
    return this.items.filter(item =>
      (item.solicitante.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.mision.toString().includes(this.searchText) ||
      item.estado.toLowerCase().includes(this.searchText.toLowerCase()) || 
      item.motorista.toLowerCase().includes(this.searchText.toLowerCase()) || 
      this.searchText === '') && 
      (item.estado === this.filtroEstado || this.filtroEstado === '')
    );
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
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.items);
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
