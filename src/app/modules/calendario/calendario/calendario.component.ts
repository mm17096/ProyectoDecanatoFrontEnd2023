import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventApi, EventInput, EventSourceFunc,formatDate } from '@fullcalendar/core';
import dayGrirdPlugin from '@fullcalendar/daygrid';
import { ServicioService } from '../servicio/servicio.service';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

fecini : string;
fecfin : string;
  calendarOptions: CalendarOptions = {
    headerToolbar: {

    },

    initialView: 'dayGridMonth',

    editable: false,
    selectable: false,
   // timeZone: 'UTC',
    locale: 'es',


    events: this.LoadEvents.bind(this),

  };

  currentEvents: EventApi[] = [];
  async LoadEvents(args: EventSourceFunc): Promise<EventInput[]> { // empieza el forech

        return new Promise<EventInput[]>((resolve) => {
         // console.log(args.startStr);


        this.soliService.getSolicitudV().subscribe(result => {
          const events: EventInput[] = [];
            result.forEach(function (val) {


          //const fechaInicio =  new Date(val.fechaSalida)
          //const fechaFin = new Date(val.fechaEntrada)

          console.log("lo que trae la consulta",val.fechaSalida);
          //   const fechaInicio = new Date(val.fechaSalida).toLocaleDateString('en-US',{year: 'numeric', month: 'numeric', day: 'numeric'});
              //const fechaFin = new Date(val.fechaEntrada).toLocaleDateString('en-US',{year: 'numeric', month: 'numeric', day: 'numeric'});
          //  const fechaInicio = `${year}-${mes}-${dia}`
          const fechaInicio = new Date(2023-8-9);
      ///     let fec1: string = `${val.fechaSalida} no funkan`
       //    let fec2: string = `${val.fechaEntrada}`
     //  let fecha = new Date();


      // const fechaFin = new Date(datedas.getFullYear());
       console.log("prueba 1",fechaInicio)
      // const date4 = fechaFin.getUTCFullYear() + '-' + (fechaFin.getUTCMonth() + 1) + '-' + fechaFin.getUTCDate();
      // console.log("prueba 2",date4)
                      /*



              while(fechaFin.getTime() >= fechaInicio.getTime()){
                fechaInicio.setDate(fechaInicio.getDate() + 1);

                console.log(fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getDate());
            }
*/

           //  console.log("usuario:",this.userService.usuarioJSON);
         /*    switch (val.estado) {
                case 1:
                  console.log("entra en case 1")
                  events.push({
                    id: val.codigoSolicitudVehiculo,
                    title: "solicitud",
                    start: val.fechaSalida,
                    end: val.fechaEntrada,
                    className: 'bg-warning text-white'
                  });
                  break;
                case 2:
                  console.log("entra en case 2")
                  events.push({
                    id: val.codigoSolicitudVehiculo,
                    title: "solicitud",
                    start: val.fechaSalida,
                    end: val.fechaEntrada,
                    className: 'bg-info text-white'
                  });
                  break;
                case 3:
                  console.log("entra en case 3")
                  events.push({
                    id: val.codigoSolicitudVehiculo,
                    title: "solicitud",
                    start: val.fechaSalida,
                    end: val.fechaEntrada,

                    color: '#873600'
                  });
                  break;
                case 4:
                  console.log("entra en case 4")
                  events.push({
                    id: val.codigoSolicitudVehiculo,
                    title: "solicitud",
                    start: val.fechaSalida,
                    end: val.fechaEntrada,
                    className: 'bg-success text-white'
                  });

                  break;
                  case 5:
                    console.log("entra en case 5")
                    events.push({
                      id: val.codigoSolicitudVehiculo,
                      title: "solicitud",
                      start: val.fechaSalida,
                      end: val.fechaEntrada,
                      color: '#B79CED'
                    });

                  break;

                  case 6:
                    console.log("entra en case 6")
                    events.push({
                      id: val.codigoSolicitudVehiculo,
                      title: "solicitud",
                      start: val.fechaSalida,
                      end: val.fechaEntrada,
                      color: '#A6ACAF'
                    });

                  break;

                default:
                  console.log("entra en case default")
                  events.push({
                    id: val.codigoSolicitudVehiculo,
                    title: "solicitud",
                    start: val.fechaSalida,
                    end: val.fechaEntrada,
                    className: 'bg-danger text-white'
                  });
                  break;

             }

        */
     //  console.log("dasdasd",fechaInicio);
      // console.log("dasdasd",fechaFin);
       let ini =formatDate(val.fechaSalida, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        timeZoneName: 'short',
        timeZone: 'UTC',
        locale: 'es'
      })
       let fin = formatDate(val.fechaEntrada, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        timeZoneName: 'short',
        timeZone: 'UTC',
        locale: 'es'
      })
//console.log("ini",fec1);
let var1 : string = fechaInicio.toISOString()
//let var2 : string = fechaFin.toISOString()

             events.push({
               id: val.codigoSolicitudVehiculo,
               title: "solicitud",
               start: var1,
             //end: var2,
               className: 'bg-danger text-white'
             });


              console.log("fecha",'2023-09-10');
   //           console.log("eventop salida",events.map(event => event.start.valueOf()));
     //         console.log("eventop entrada",events.map(event => event.end.valueOf()));
              resolve(events);
            });
          }, error => console.error(error));
        });
      } // termina el forech

       handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  breadCrumbItems: Array<{}>;
  usuariojson : any;

  constructor( private soliService: ServicioService, private userService: UsuarioService) {

   }



  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Calendario' }, { label: 'Solicitud', active: true }];
  }

}
