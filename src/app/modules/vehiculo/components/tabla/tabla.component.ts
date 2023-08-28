import { Component, OnInit } from '@angular/core';
import { IVehiculos } from '../../interfaces/vehiculo-interface';
import { VehiculoService } from '../../service/vehiculo.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  vehiculos: IVehiculos[] = [];

  constructor(private vehiService:VehiculoService) { }

  ngOnInit(): void {
    this.obtenerVehiculos();
  }

  obtenerVehiculos(){
    this.vehiService.getVehiculos().subscribe((resp) => {
      this.vehiculos = resp;
    });
  }

}
