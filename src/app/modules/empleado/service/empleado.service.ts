import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICargo, IDepartamento, IEmpleado, IEmpleadoTabala } from '../interface/empleado.interface';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  private baseUrl: string = environment.baseUrl;

  listDepartamentos: IDepartamento[] = [];
  listEmpleados: IEmpleado[] = [];
  listCargos: ICargo[] = [];

  constructor(private http: HttpClient) { }

  //Obtener empleados para la tabla
  getEmpleados() {
    this.http
      .get(`${this.baseUrl}/empleado/lista`)
      .pipe(map((resp: any) => resp.content as IEmpleado[]))
      .subscribe(
        (empleados: IEmpleado[]) => {
          console.log(empleados);
          this.listEmpleados = empleados; // Actualiza la propiedad listEmpleados
        },
        (error) => {
          console.error("Error al obtener las empleados:", error);
        }
      );
  }

  getCargos() {
    this.http
      .get(`${this.baseUrl}/cargo`)
      .pipe(map((resp: any) => resp as ICargo[]))
      .subscribe(
        (cargos: ICargo[]) => {
          this.listCargos = cargos;
        },
        (error) => {
          console.error("Error al obtener los cargos:", error);
        }
      );
  }

  getDepartamentos() {
    this.http
      .get(`${this.baseUrl}/depto`)
      .pipe(map((resp: any) => resp as IDepartamento[]))
      .subscribe(
        (departamentos: IDepartamento[]) => {
          this.listDepartamentos = departamentos;
        },
        (error) => {
          console.error("Error al obtener los departamentos:", error);
        }
      );
  }

//Obtener estado por ID
  ObtenerestadoporID(id): any {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/estados/PorID/${id}`).subscribe(data => {
        return resolve(data);
      }, err => {
        console.log(err);
      });

    });
  }

  getEstadoNombre(nombre: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/estados/PorID/${nombre}`);
  }

  public postEmpleado(empleado: IEmpleado): Observable<Object> {
    return this.http.post(`${this.baseUrl}/empleado/insertar`, empleado);
  }

  public postEmpleadoImagen(empleado: IEmpleado, file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('imagen', file);
    formData.append('empleado', JSON.stringify(empleado));
    return this.http.post(`${this.baseUrl}/empleado/insertarconImagen`, formData);
  }

  public putEmpleado(empleado: IEmpleado): any {
    return this.http.put(`${this.baseUrl}/empleado/editar/${empleado.codigoEmpleado}`, empleado);
  }

  public putEmpleadoImagen(empleado: IEmpleado, file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('imagen', file);
    formData.append('empleado', JSON.stringify(empleado));
    return this.http.put(`${this.baseUrl}/empleado/editarconImagen/${empleado.codigoEmpleado}`, formData);
  }

}
