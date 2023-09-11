import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IEmpleado } from 'src/app/modules/empleado/interface/empleado.interface';
import { environment } from 'src/environments/environment';

interface Event {
    type: string;
    payload?: any;
}

type EventCallback = (payload: any) => void;

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private handler = new Subject<Event>();
    private baseUrl: string = environment.baseUrl;
    empleado: IEmpleado[];
    constructor(private http: HttpClient) { }

    /**
     * Broadcast the event
     * @param type type of event
     * @param payload payload
     */
    broadcast(type: string, payload = {}) {
        this.handler.next({ type, payload });
    }

    /**
     * Subscribe to event
     * @param type type of event
     * @param callback call back function
     */
    subscribe(type: string, callback: EventCallback): Subscription {
        return this.handler.pipe(
            filter(event => event.type === type)).pipe(
                map(event => event.payload))
            .subscribe(callback);
    }

    //Obtener empleados para la tabla
    getEmpleado(name: string) {
        return this.http.get<IEmpleado>(`${this.baseUrl}/empleado/lista/${name}`);
    }

}
