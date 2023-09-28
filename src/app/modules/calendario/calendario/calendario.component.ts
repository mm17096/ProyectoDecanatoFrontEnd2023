import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: [
      { title: 'event 1', date: '2023-09-27' },
      { title: 'event 2', date: '2023-09-30' }
    ]
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  breadCrumbItems: Array<{}>;
  constructor() { }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Departamento' }, { label: 'Listar', active: true }];
  }

}
