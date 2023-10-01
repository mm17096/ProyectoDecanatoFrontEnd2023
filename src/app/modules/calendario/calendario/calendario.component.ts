import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventApi, EventInput, EventSourceFunc,formatDate } from '@fullcalendar/core';
import dayGrirdPlugin from '@fullcalendar/daygrid';
import { ServicioService } from '../servicio/servicio.service';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';
import { SolicitudVv } from '../../solicitudes/Interfaces/SolicitudVv';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {




  calendarOptions: CalendarOptions = {
    headerToolbar: {

    },

    initialView: 'dayGridMonth',

    editable: true,
    selectable: true,
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


     // Fechas a objeto Date
          const fechaInicio = new Date(val.fechaSalida);
          const fechaFin = new Date(val.fechaEntrada);

          // Aumentamos en 1 el dia de fin para que el calendario lo pinte bien
          fechaFin.setDate(fechaFin.getDate() + 1);

          // Convertimos las fechas a string con formato ISO para que el calendario las pinte bien
          let var1 : string = fechaInicio.toISOString().split('T')[0];
          let var2 : string = fechaFin.toISOString().split('T')[0];

          // switch para pintar los eventos segun el estado
             switch (val.estado) {
                case 1:

                  events.push({
                    id: val.codigoSolicitudVehiculo,
                    title: "solicitud",
                    start: var1,
                    end: var2,
                    className: 'bg-warning text-white'
                  });
                  break;
                case 2:

                  events.push({
                    id: val.codigoSolicitudVehiculo,
                    title: "solicitud",
                    start: var1,
                    end: var2,
                    className: 'bg-info text-white'
                  });
                  break;
                case 3:

                  events.push({
                    id: val.codigoSolicitudVehiculo,
                    title: "solicitud",
                    start: var1,
                    end: var2,

                    color: '#873600'
                  });
                  break;
                case 4:

                  events.push({
                    id: val.codigoSolicitudVehiculo,
                    title: "solicitud",
                    start: var1,
                    end: var2,
                    className: 'bg-success text-white'
                  });

                  break;
                  case 5:

                    events.push({
                      id: val.codigoSolicitudVehiculo,
                      title: "solicitud",
                      start: var1,
                      end: var2,
                      color: '#B79CED'
                    });

                  break;

                  case 6:

                    events.push({
                      id: val.codigoSolicitudVehiculo,
                      title: "solicitud",
                      start: var1,
                      end: var2,
                      color: '#A6ACAF'
                    });

                  break;

                default:

                  events.push({
                    id: val.codigoSolicitudVehiculo,
                    title: "solicitud",
                    start: var1,
                    end: var2,
                    className: 'bg-danger text-white'
                  });
                  break;

             }

              resolve(events); // almacena los eventos
            }); // termina el foreach
          }, error => console.error(error));
        });
      } // termina el metodo async

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
