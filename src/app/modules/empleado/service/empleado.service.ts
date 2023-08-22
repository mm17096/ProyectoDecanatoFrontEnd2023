import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICargo, IDepartamento, IEmpleado, IEmpleadoTabala } from '../interface/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  url = "http://localhost:8081/";

  constructor(private http: HttpClient) { }

  //Obtener empleados para la tabla
  public getEmpleados(): Observable<IEmpleado[]> {
    return this.http.get<IEmpleado[]>(this.url + "empleado/tabla");
  }

  public getCargos(): Observable<ICargo[]> {
    return this.http.get<ICargo[]>(this.url + "cargo");
  }

  public getDepartamentos(): Observable<IDepartamento[]> {
    return this.http.get<IDepartamento[]>(this.url + "depto");
  }

  public getCargo(nombre: string): Observable<ICargo> {
    return this.http.get<ICargo>(this.url + "cargo/name/" + nombre);
  }

  public postEmpleado(empleado: IEmpleado, file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('imagen', file);
    formData.append('empleado', JSON.stringify(empleado));
    return this.http.post(this.url + "empleado/insertar", formData);
  }

  public putEmpleado(empleado: IEmpleado): Observable<Object> {
    return this.http.put(this.url + "empleado/modificarsinImagen", empleado);
  }

  public putEmpleadoImagen(empleado: IEmpleado, file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('imagen', file);
    formData.append('empleado', JSON.stringify(empleado));
    return this.http.put(this.url + "empleado/modificarconImagen", formData);
  }

}
