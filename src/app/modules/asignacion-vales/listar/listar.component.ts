import { Component, Input, OnInit } from "@angular/core";
import { DetalleService } from "../services/detalle.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.scss"],
})
export class ListarComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  p: any;
  term: string = "";
  currentPage = 1;

  @Input() queryString!: string;

  constructor(private service: DetalleService, private http: HttpClient) {}
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Vales" },
      { label: "Asignación de Vales" },
      { label: "Registro de Asignaciones", active: true },
    ];

    this.service.getDetalleAsignacionValePage();
  }

  pageChange(page:number){
    this.service.getDetalleAsignacionValePage(page-1);
  }

  get listDetalle() {
    return this.service.listDetalle;
  }
}
