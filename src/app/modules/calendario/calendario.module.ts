import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from "@fullcalendar/bootstrap";

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarioComponent } from './calendario/calendario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);



@NgModule({
  declarations: [
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,
    NgbModule,
    FormsModule,
    NgSelectModule
  ]
})
export class CalendarioModule { }
