import { Component, OnInit } from '@angular/core';
import { IEntradaSalida } from '../../interface/EntSalinterface';
import { IVehiculoentradaSalida } from '../../interface/VehiculoEntradasalida';
import { ListaentradasalidaService } from '../../service/listaentradasalida.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
   // bread crumb items
   vehiculos:IVehiculoentradaSalida[]=[];//array de vehiculos
   breadCrumbItems: Array<{}>;
   entradasalidas: IEntradaSalida[]=[];
   term: string='';
   transactions;
   parametroBuscar: string='';//parametro de busqueda.

  constructor(private listavehiculos: ListaentradasalidaService) { }

  ngOnInit(): void {
    
    this.breadCrumbItems = [{ label: 'Entradas' }, { label: 'Salidas', active: true }];
  
  this.transactions = [
    {
      id: '#SK2540',
      name: 'Neal Matthews',
      date: '07 Oct, 2019',
      total: '$400',
      status: 'Paid',
      payment: ['fab fa-cc-mastercard', 'Mastercard'],
      index: 1,
    },
    {
      id: '#SK2541',
      name: 'Jamal Burnett',
      date: '07 Oct, 2019',
      total: '$380',
      status: 'Chargeback',
      payment: ['fab fa-cc-visa', 'Visa'],
      index: 2,
    },
    {
      id: '#SK2542',
      name: 'Juan Mitchell',
      date: '06 Oct, 2019',
      total: '$384',
      status: 'Paid',
      payment: ['fab fa-cc-paypal', 'Paypal'],
      index: 3,
    },
    {
      id: '#SK2543',
      name: 'Barry Dick',
      date: '05 Oct, 2019',
      total: '$412',
      status: 'Paid',
      payment: ['fab fa-cc-mastercard', 'Mastercard'],
      index: 4,
    },
    {
      id: '#SK2544',
      name: 'Ronald Taylor',
      date: '04 Oct, 2019',
      total: '$404',
      status: 'Refund',
      payment: ['fab fa-cc-visa', 'Visa'],
      index: 5,
    },
    {
      id: '#SK2545',
      name: 'Jacob Hunter',
      date: '04 Oct, 2019',
      total: '$392',
      status: 'Paid',
      payment: ['fab fa-cc-paypal', 'Paypal'],
      index: 6,
    },
    {
      id: '#SK2546',
      name: 'William Cruz',
      date: '03 Oct, 2019',
      total: '$374',
      status: 'Paid',
      payment: ['fas fa-money-bill-alt', 'COD'],
      index: 7,
    },
    {
      id: '#SK2547',
      name: 'Dustin Moser',
      date: '02 Oct, 2019',
      total: '$350',
      status: 'Paid',
      payment: ['fab fa-cc-mastercard', 'Mastercard'],
      index: 8,
    },
    {
      id: '#SK2548',
      name: 'Clark Benson',
      date: '01 Oct, 2019',
      total: '$345',
      status: 'Refund',
      payment: ['fab fa-cc-visa', 'Visa'],
      index: 9,
    },
  ];

  this.buscar();
}

buscar():void{
  //metodo para buscar
  this.parametroBuscar=this.parametroBuscar.toLocaleLowerCase();
  this.listavehiculos.buscarVehiculo(this.parametroBuscar).subscribe((resp:IVehiculoentradaSalida[])=>{this.vehiculos=resp;});

}

}
