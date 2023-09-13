import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { DetalleService } from "../../services/detalle.service";
import { IAsignacionDetalle } from "../../interfaces/asignacion.interface";

@Component({
  selector: "app-tabla-detalle",
  templateUrl: "./tabla-detalle.component.html",
  styleUrls: ["./tabla-detalle.component.scss"],
})
export class TablaDetalleComponent implements OnInit {
  valesASignados: IAsignacionDetalle;
  constructor(private service: DetalleService, private http: HttpClient) {}

  @Input() codigoAsignacion: string = "";
  ngOnInit(): void {
    this.mostrarVales();
  }

  mostrarVales() {
    this.service.getDetalleAsignacionVale(this.codigoAsignacion).subscribe({
      next: (data) => {
        console.log('aquí llega:');

        this.valesASignados = data;
        console.log('aquí van los vales: ', this.valesASignados.vales);
      },
    });
  }
}
