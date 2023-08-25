import { Component, OnInit } from '@angular/core';
import { IDepto } from '../interface/depto';
import { DeptoService } from '../service/depto.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {



  breadCrumbItems: Array<{}>;
  lstDeptos: IDepto[] = [];
  constructor(private deptoService : DeptoService) { }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Formulario' }, { label: 'Listar', active: true }];
    this.getDeptos(8);
  }

  cargaDeptos(event : any){
    const estado = event.target.value;
    this.getDeptos(Number(estado));
  }

  getDeptos(estado : number){
    this.deptoService.getDeptos(estado).subscribe((data: IDepto[]) => {
      this.lstDeptos = data;
    });
  }

}
