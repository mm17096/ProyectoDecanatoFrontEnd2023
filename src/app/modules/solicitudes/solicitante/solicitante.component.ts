import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { IEstados, ISolicitudVehiculo } from '../../solicitud-vehiculo/interfaces/data.interface';
import { SolicitudVehiculoService } from '../../solicitud-vehiculo/services/solicitud-vehiculo.service';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';
import { ConsultaService } from '../Service/Excel/consulta.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { LOGO } from '../Interfaces/logo';
import { IConsultaDelAl, Tabla } from '../Interfaces/CompraVale/Consulta';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrls: ['./solicitante.component.scss']
})
export class SolicitanteComponent implements OnInit {
  solicitudesVehiculo!: ISolicitudVehiculo[];
  selectedData: any;
  valeDelAl: IConsultaDelAl[];
  // migas de pan
  breadCrumbItems: Array<{}>;
  term: any; // para buscar
  p: any; // paginacion

  page:number = 0;
  size:number = 10;
  tabla:Tabla;

  estadoSeleccionado: any;
  estadosSoliVe: IEstados [] = [];
  fechaActual: Date = new Date();

  constructor( private soliVeService: SolicitudVehiculoService, private modalService: NgbModal,
               private userService: UsuarioService, private consultaService: ConsultaService,) { }

  ngOnInit(): void {
    this.userService.getUsuario();
    this.breadCrumbItems = [{ label: 'Solicitud de Vehículo' }, { label: 'Mis Solicitudes', active: true }]; // miga de pan
   // this.soliVeService.getSolicitudesVehiculo(this.estadoSeleccionado);
    this.getEstados();
    this.cargarConsulta();
  }
  cargarConsulta(){
    this.consultaService.getSolicitudV().subscribe((response)=>{
      this.solicitudesVehiculo = response;

      });
  }
  get usuarioActivo(){
    return this.userService.usuario;
  }

  get listSoliVeData(){
    return this.soliVeService.listSoliVehiculo;
  }

  onEstadoSeleccionado(event: any) {
    this.estadoSeleccionado = event.target.value;
    if (this.estadoSeleccionado == 0) {
      this.soliVeService.getSolicitudesVehiculo(null);
    } else {
      this.soliVeService.getSolicitudesVehiculo(this.estadoSeleccionado);
    }
  }

  getEstados() {
    this.soliVeService.obtenerEstados().subscribe((resp) => {
      this.estadosSoliVe = resp;
    });
  }


  calcularNumeroCorrelativo(index: number): number {
    if (typeof this.p === 'number') {
      return (this.p - 1) * 10 + index + 1;
    } else {
      return index + 1; // Si no es numérico, solo regresamos el índice + 1
    }
  }
  cerarPDF(soliVehi: ISolicitudVehiculo){
    console.log("data: ", soliVehi);

    console.log("codigo: ", soliVehi.codigoSolicitudVehiculo);
    this.cargarConsultaValeDelAl(soliVehi.codigoSolicitudVehiculo);

     const pdfDefinicion: any = {content:[],}
    pdfDefinicion.content.push(
     {
			style: 'tableExample',
			table: {
        widths: ['auto', '*'],
				headerRows: 1,
				body: [
					[{ image: LOGO, // Datos base64 de tu imagen .png
          width: 60, // Ancho de la imagen
          height: 80,},
          {text: 'UNIVERSIDAD DE EL SALVADOR\nFACULTAD MULTIDISCIPLINARIA PARACENTRAL\nSOLICITUD DE TRASPORTE',
          alignment: 'center',style: 'subheader'}

         ],

				]
			},
			layout: 'noBorders'
		},
    {text:'\n'},
    {
			style: 'tableExample',
			table: {
        widths: ['*'],
				headerRows: 1,
				body: [
					[{text: 'SOLICITANTE', style: 'tableHeader',alignment: 'center'}],
				 	[''],
				]
			},
			layout: 'lightHorizontalLines'
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Fecha de Solicitud: '+soliVehi.fechaSolicitud,

				},
				{
					text: 'Fecha de Mision: '+soliVehi.fechaSalida,

				},

			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Unidad Solicitud: '+soliVehi.unidadSolicitante,

				},

			]
		},
    {text:'\n'},
		{
			columns: [
				{

					text: 'Vehiculo: '+soliVehi.vehiculo.marca+', '+soliVehi.vehiculo.modelo+', '+soliVehi.vehiculo.clase+', '+soliVehi.vehiculo.tipo_gas+', '+soliVehi.vehiculo.color+', '+soliVehi.vehiculo.year,

				},
				{
					text: 'Placa: '+soliVehi.vehiculo.placa,

				},

			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Objeto de la Mision: '+soliVehi.objetivoMision,

				},

			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Lugar que visitara: '+soliVehi.direccion,

				},

			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'N* de Personas que viajan: '+soliVehi.cantidadPersonas,

				},
				{
					text: 'Hora de Salida: '+soliVehi.horaSalida,

				},
        {
					text: 'Hora de Regreso: '+soliVehi.horaEntrada,

				},

			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Nombre del responsable: '+soliVehi.solicitante.empleado.nombre+' '+soliVehi.solicitante.empleado.apellido,
				},
        {

					text: 'Firma: ',
				},
			]
		},

    {text:'\n'},
    {
			columns: [
				{
					text: 'LISTADO DE PASAJEROS',
          style: 'tableHeader',
          alignment: 'center'
				},

			]
		},
    {text:'\n'},
    )
     /*
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }*/
      const tableRow = [];
      let j = 0;
      tableRow.push([{ text: 'N*',
      alignment: 'center',style: 'tableHeader'},
      {text: 'NOMBRE',
      alignment: 'center',style: 'tableHeader'}

     ],);
       for (const persona of soliVehi.listaPasajeros) {
         console.log(persona.nombrePasajero);
         tableRow.push([{text: `${j+1}`,
         alignment: 'center'}, {text: `${persona.nombrePasajero}`,
         alignment: 'center'}],);
         j++;
       }
    pdfDefinicion.content.push(
      {
        style: 'tableExample',
        table: {
          widths: ['auto', '*'],
          headerRows: 1,
          body: tableRow
        },
      },
      'Nota: Si el numero de persona es mayor a cuatro, Anexar Listado',
    );

    pdfDefinicion.content.push(
      {text:'\n'},
    {
			columns: [
				{

					text: 'Sello\n',
          alignment: ''

				},
			]
		},
    {
			style: 'tableExample',
			table: {
        widths: ['*'],
				headerRows: 1,
				body: [
					[{text: 'AUTORIZACION', style: 'tableHeader',alignment: 'center'}],
				 	[''],
				]
			},
			layout: 'lightHorizontalLines'
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Nombre de Motorista: '+soliVehi.motorista?.nombre+', '+soliVehi.motorista?.apellido,

				},

			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Vehiculo: '+soliVehi.vehiculo.marca+', '+soliVehi.vehiculo.modelo+', '+soliVehi.vehiculo.clase+', '+soliVehi.vehiculo.tipo_gas+', '+soliVehi.vehiculo.color+', '+soliVehi.vehiculo.year,

				},
				{
					text: 'Placa: '+soliVehi.vehiculo.placa,

				},


			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'N* de Vales: '+this.valeDelAl.length,

				},
				{
					text: 'Del: '+this.valeDelAl[0].correlativo,

				},
        {
					text: 'AL: '+this.valeDelAl[this.valeDelAl.length-1].correlativo,

				},

			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'F.',

				},
				{
					text: 'Sello',

				},


			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Nombre y firma Decano',

				},

			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Observaciones: '+soliVehi.observaciones,

				},

			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Fecha y Hora de imprecion: '+this.formatoFecha(this.fechaActual),
          alignment: 'right'
				},

			]
		},
    );
    pdfMake.createPdf(pdfDefinicion).open();

  }

  cargarConsultaValeDelAl(id:string){
    this.consultaService.getConsultaSolicitudVDelAl(id).subscribe((response)=>{
      this.valeDelAl = response;
          console.log(response);
      });
  }
  formatoFecha(fecha: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    return fecha.toLocaleDateString(undefined, options);
  }
  fortablapasajeros(soliVehi1: ISolicitudVehiculo){
  //  const tableBody = [];
  //  const row = data[i];
  const tableRow = [];
     let j = 0;
     tableRow.push({i:'N*',codi:'Nombre'});
      for (const persona of soliVehi1.listaPasajeros) {
        console.log(persona.nombrePasajero);
        tableRow.push({i:`${j+1}`,codi:persona.nombrePasajero});
        j++;
      }
  }

}
