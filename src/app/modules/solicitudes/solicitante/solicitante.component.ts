import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { IEstados, ISolicitudVehiculo } from '../../solicitud-vehiculo/interfaces/data.interface';
import { SolicitudVehiculoService } from '../../solicitud-vehiculo/services/solicitud-vehiculo.service';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';
import { ConsultaService } from '../Service/Excel/consulta.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { LOGO } from '../Interfaces/logo';
import { DocumetSoliC, DocumetVale, DocumetValeId, IConsultaDelAl, Tabla } from '../Interfaces/CompraVale/Consulta';
import { Usuario, Empleado } from 'src/app/account/auth/models/usuario.models';
import { MensajesService } from 'src/app/shared/global/mensajes.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrls: ['./solicitante.component.scss']
})
export class SolicitanteComponent implements OnInit {
  solicitudesVehiculo!: ISolicitudVehiculo[];
  selectedData: any;
  valeDelAl!: IConsultaDelAl[];
  documentSoliCard!:DocumetSoliC[];
  documentVale!:DocumetVale[];
  documentValeId:DocumetValeId[]=[];

  // migas de pan
  breadCrumbItems: Array<{}>;
  term: any; // para buscar
  p: any; // paginacion

  page:number = 0;
  size:number = 10;
  tabla:Tabla;
  usuario: Usuario;
  empleado!: Empleado;
  veri:boolean=false;
  estadoSeleccionado: any;
  estadosSoliVe: IEstados [] = [];
  fechaActual: Date = new Date();

  constructor( private soliVeService: SolicitudVehiculoService, private modalService: NgbModal,
               private userService: UsuarioService, private consultaService: ConsultaService,
               private mensajesService: MensajesService) { }

  ngOnInit(): void {
    
    this.obtenerUsuarioActivo();
    console.log('usuario ',this.usuarioActivo)
    this.userService.getUsuario();
    this.breadCrumbItems = [{ label: 'Solicitud de trasporte' }, { label: 'Mis Solicitudes', active: true }]; // miga de pan
   // this.soliVeService.getSolicitudesVehiculo(this.estadoSeleccionado);
    this.getEstados();
    this.obtenerUsuarioActivo();
   // console.log('esta', this.solicitudesVehiculo.)
  }
  obtenerUsuarioActivo(){
  // this.empleado = this.userService.get();
   //console.log(this.userService.get())
    // Suscríbete al Observable para obtener el usuario
this.consultaService.getEmpleado().subscribe((usuario) => {
if(usuario.cargo.nombreCargo == "ASISTENTE FINANCIERA" || usuario.cargo.nombreCargo == "JEFE FINANCIERO" || usuario.cargo.nombreCargo == "ADMINISTRADOR"){
        this.veri=false;
        this.cargarConsulta();
      }else{
        this.veri=true;
}

 console.log('usuario ',usuario)
});
    console.log('usuario ',this.usuario)
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
/**
   * Open Large modal
   * @param largeDataModal large modal data
   */
DocumentosSoliCard(soliVehi: ISolicitudVehiculo,largeDataModal: any){
  this.cargarDocSoliCar(soliVehi.codigoSolicitudVehiculo);
  if(soliVehi.cantidadPersonas > 5){
  this.modalService.open(largeDataModal, { size: "xl", centered: true });
  }else{
    this.mensajesService.mensajesSweet(
      "warning",
      "Ups... ",
      "No hay documentos para mostrar'"
    );
  }
}

DocumentosVale(soliVehi: ISolicitudVehiculo,largeDataModal: any){
  this.cargarDocValeID(soliVehi.codigoSolicitudVehiculo,largeDataModal);
 // if(this.documentVale.length != 0){
/*}else{
  this.mensajesService.mensajesSweet(
    "warning",
    "Ups... ",
    "No hay documentos para mostrar'"
  );
}*/
}
cargarDocSoliCar(id: string){
  this.consultaService.getConsultaDocumnetoSoliCa(id).subscribe((response: DocumetSoliC[])=>{
    this.documentSoliCard = response;
     //   console.log(response);
    });
}
cargarDocValeID(id:string,largeDataModal: any){
  this.consultaService.getConsultaDocumnetoValeId(id).subscribe((response: DocumetValeId[])=>{
    //this.documentValeId.push(response);
   // console.log(response)
    this.cargarDocVale(response[0].idsolicitudvale,largeDataModal);
  });
}
cargarDocVale(id:string,largeDataModal: any){
  this.consultaService.getConsultaDocumnetoVale(id).subscribe((response: DocumetVale[])=>{
    this.documentVale = response;
    if(response === null){
      this.mensajesService.mensajesSweet(
        "warning",
        "Ups... ",
        "No hay documentos para mostrar'"
      );
    }else{
      this.modalService.open(largeDataModal, { size: "xl", centered: true });
    }
        console.log(response);
    });
}
descargarver(doc:DocumetSoliC){
  const tipoBuscado = "Lista de pasajeros";
    this.soliVeService.obtenerDocumentPdf(doc.nombredocment)
    .subscribe((resp:any) => {
      let file = new Blob([resp], { type: 'application/pdf' });
      let fileUrl = URL.createObjectURL(file);
      window.open(fileUrl);
    });
}
descarver(doc:DocumetVale){
  const nombreDocumento = doc.foto; // Reemplaza con el nombre del documento que desees descargar

  this.consultaService.descargarDocumento(nombreDocumento).subscribe(
    (data: Blob) => {
      // Crear un objeto URL a partir del Blob
      const url = window.URL.createObjectURL(data);

      // Crear un enlace invisible en el DOM y hacer clic en él para iniciar la descarga
      const a = document.createElement('a');
      a.href = url;
      a.download = nombreDocumento; // Nombre de archivo para la descarga
      document.body.appendChild(a);
      a.click();

      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    (error) => {
      console.error('Error al descargar el documento', error);
    });
}
  cerarPDF(soliVehi: ISolicitudVehiculo,vales: IConsultaDelAl[]){
   // this.cargarConsultaValeDelAl(soliVehi.codigoSolicitudVehiculo);
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

					text: 'Fecha de Solicitud: '+this.formatDate(`${soliVehi.fechaSolicitud}`),
         
				},
				{
					text: 'Fecha de Misión: '+this.formatDate(`${soliVehi.fechaSalida}`),
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

					text: 'Objetivo de la Misión: '+soliVehi.objetivoMision,
         
				},

			]
		},
    {text:'\n'},
    {
			columns: [
				{

					text: 'Lugar que visitará: '+soliVehi.direccion,
         
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
      'Nota: Si el número de persona es mayor a cuatro, Anexar Listado',
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

					text: 'Vehículo: '+soliVehi.vehiculo.marca+', '+soliVehi.vehiculo.modelo+', '+soliVehi.vehiculo.clase+', '+soliVehi.vehiculo.tipo_gas+', '+soliVehi.vehiculo.color+', '+soliVehi.vehiculo.year,
          
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

					text: 'N* de Vales: '+vales.length,
          
				},
				{
					text: 'Del: '+vales[0].correlativo,
          
				},
        {
					text: 'AL: '+vales[this.valeDelAl.length-1].correlativo,

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

  cargarConsultaValeDelAl(soli: ISolicitudVehiculo){
    this.consultaService.getConsultaSolicitudVDelAl(soli.codigoSolicitudVehiculo).subscribe((response: IConsultaDelAl[])=>{
      this.valeDelAl = response;
      this.cerarPDF(soli,response);
       //   console.log(response);
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
  formatDate(fechaStr: string): string {
    // Dividir la cadena en partes
    const partes = fechaStr.split('-');
    if (partes.length !== 3) {
      return 'Fecha inválida';
    }

    // Crear una nueva cadena con el formato deseado (dd/MM/yyyy)
    const fechaFormateada = `${partes[2]}/${partes[1]}/${partes[0]}`;
    return fechaFormateada;
  }

}
