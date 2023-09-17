import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DetalleService } from "../../services/detalle.service";
import { IAsignacionDetalle } from "../../interfaces/asignacion.interface";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { stringify } from "querystring";

@Component({
  selector: "app-encabezado",
  templateUrl: "./encabezado.component.html",
  styleUrls: ["./encabezado.component.scss"],
})
export class EncabezadoComponent implements OnInit {
  detalleAsignacion: IAsignacionDetalle;
  breadCrumbItems: Array<{}>;

  p: any;
  term: string = "";
  currentPage = 1;
  codigoAsignacion: string;
  //@Input() queryString!: string;

  mision: string = "";
  constructor(
    private service: DetalleService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Vales" },
      { label: "Asignación de Vales" },
      { label: "Registro de Asignaciones", active: true },
    ];

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.codigoAsignacion = params.get("codigoAsignacion");
    });

    console.log("codigoAsignacion en Líquidar: ", this.codigoAsignacion);

    this.obtnerEncabezado(this.codigoAsignacion);
  }

  obtnerEncabezado(codigoA: string) {
    this.service.getDetalleAsignacionVale(codigoA).subscribe({
      next: (data) => {
        this.detalleAsignacion = data;
        this.mision = this.detalleAsignacion.mision;
        console.log(this.detalleAsignacion);
      },
    });
  }
  /* pageChange(page:number){
    //this.service.getDetalleAsignacionValePage(page-1);
  }

  get listDetalle() {
   // return this.service.listDetalle;
   return  null;
  }
 */
}
