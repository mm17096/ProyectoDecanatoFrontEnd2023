import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventApi, EventInput, EventSourceFunc } from '@fullcalendar/core';
import dayGrirdPlugin from '@fullcalendar/daygrid';
import { ServicioService } from '../servicio/servicio.service';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {


  calendarOptions: CalendarOptions = {
    plugins: [dayGrirdPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,

    eventsSet: this.handleEvents.bind(this),

    events: this.LoadEvents.bind(this)
  };
  currentEvents: EventApi[] = [];
  async LoadEvents(args: EventSourceFunc): Promise<EventInput[]> {
        return new Promise<EventInput[]>((resolve) => {
         // console.log(args.startStr);
        this.soliService.getSolicitudV().subscribe(result => {
          const events: EventInput[] = [];
            result.forEach(function (val) {

              const fechaInicio = new Date(val.fechaSalida);
              const fechaFin = new Date(val.fechaEntrada);
              /*
              while(fechaFin.getTime() >= fechaInicio.getTime()){
                fechaInicio.setDate(fechaInicio.getDate() + 1);

                console.log(fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getDate());
            }
*/

             // console.log(result.length);

              events.push({
                id: val.codigoSolicitudVehiculo,
                title: "solicitud",
                start: val.fechaSalida,
                end: val.fechaEntrada,
              });
              console.log(events);
              resolve(events);
            });
          }, error => console.error(error));
        });
      }

       handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  breadCrumbItems: Array<{}>;

  constructor( private soliService: ServicioService, private userService: UsuarioService) { }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Departamento' }, { label: 'Listar', active: true }];
  }

}
