import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IVehiculos } from "../interfaces/vehiculo-interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class VehiculoService {
  url = "http://localhost:8080/";

  constructor(private http: HttpClient) {}

  public getVehiculos(): Observable<IVehiculos[]> {
    return this.http
      .get<IVehiculos[]>(this.url + "api/vehiculo/lista")
      .pipe(map((resp: any) => resp.content as IVehiculos[]));
  }

  
}
