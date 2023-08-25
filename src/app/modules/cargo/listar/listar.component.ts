import { Component, OnInit } from '@angular/core';
import { CargoService } from '../service/cargoservice';
import { ICargo } from '../interface/cargo';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  lstCargos: ICargo[] = [];
  constructor(private cargoService : CargoService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Formulario' }, { label: 'Listar', active: true }];
    this.getCargos(8);
  }

  cargaCargos(event : any){
  const estado = event.target.value;
  this.getCargos(Number(estado));
  }

  getCargos(estado : number){
    console.log(estado);
    this.cargoService.getCargos(estado).subscribe((data: ICargo[]) => {
      this.lstCargos = data;
    });
  }

}
