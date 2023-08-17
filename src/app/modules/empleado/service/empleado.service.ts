import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpleadoTabala } from '../interface/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  url = "http://localhost:8081/";

  constructor(private http: HttpClient) { }

  //Obtener empleados para la tabla
  public getEmpleadosTabla(): Observable<IEmpleadoTabala[]> {
    return this.http.get<IEmpleadoTabala[]>(this.url + "empleado/tabla");
  }

}
