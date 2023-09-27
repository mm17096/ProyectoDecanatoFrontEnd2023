import { Injectable } from "@angular/core";
import {
  IAsignacionDetalle,
  IValesADevolver,
  ILiquidacion,
  IAnularMision,
  IAsignacionValeSolicitud,
} from "../interfaces/asignacion.interface";
import { environment } from "src/environments/environment";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IDocumentosvale } from "../interface/IDocumentosvale";
import { Observable, throwError } from "rxjs";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { catchError, map } from "rxjs/operators";
import { SolicitudVale } from "../interface/IsolicitudvaleDocument";
import { UsuarioService } from "src/app/account/auth/services/usuario.service";
import {
  ISolcitudAprobar,
  ISolicitudValeAprobar,
} from "../../solicitudes/Interfaces/solicitudValeAprobar.interface";

@Injectable({
  providedIn: "root",
})
export class DetalleService {
  listDeMisiones: SolicitudVale[] = [];
  private burl: string = environment.baseUrl;
  private baseUrl: string = environment.baseUrl;
  private requestOptions: any;
  constructor(private http: HttpClient, usuarios: UsuarioService) {
    // Recupera el token de acceso desde el local storage
    const token = localStorage.getItem("token");

    // Crea un objeto HttpHeaders para agregar el token de acceso en el encabezado 'Authorization'
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Configura las opciones de la solicitud HTTP con los encabezados personalizados
    this.requestOptions = {
      headers: headers,
    };
  }

  getMisiones() {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const requestOptions = {
      headers: headers,
    };

    this.http
      .get(`${this.baseUrl}/solicitudvale/listasinpagina`, requestOptions)

      .pipe(map((resp: any) => resp as SolicitudVale[]))
      .subscribe(
        (lista: SolicitudVale[]) => {
          console.log(lista);
          this.listDeMisiones = lista;
          console.log(lista);
        },
        (error) => {
          console.error("Error al obtener las misiones:", error);
        }
      );
  }

  ObtenerLista(id: string) {
    return this.http.get<IDocumentosvale[]>(`${this.baseUrl}/document/${id}`);
  }

  public NuevosDatos(
    document: IDocumentosvale,
    file: File
  ): Observable<Object> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const requestOptions = {
      headers: headers,
    };
    const formData: FormData = new FormData();
    formData.append("imagen", file);
    formData.append("document", JSON.stringify(document));
    return this.http.post(
      `${this.burl}/document/insertar`,
      formData,
      requestOptions
    );
  }

  getDetalleAsignacionVale(codigoAsignacion: string) {
    return this.http.get<IAsignacionDetalle>(
      `${this.baseUrl}/asignacionvale/listar/${codigoAsignacion}`
    );
  }
  getAsignacionValeSolicitudVale(codigoAsignacion: string) {
    return this.http.get<IAsignacionValeSolicitud>(
      `${this.baseUrl}/asignacionvale/ver/${codigoAsignacion}`
    );
  }

  devolverVales(valesParaDevolucion: IValesADevolver, usuario: string) {
    console.log("interfaz: ", valesParaDevolucion);

    const data = {
      valeDevuelto: valesParaDevolucion,
      usuario: usuario,
    };
    return this.http.post(
      `${this.baseUrl}/asignacionvale/devolver`,
      data
    );
  }

  liquidarVales(valesParaLiquidar: ILiquidacion, usuario: string) {
    const data = {
      valesLiquidados: valesParaLiquidar,
      usuario: usuario,
    };
    return this.http.post(
      `${this.baseUrl}/asignacionvale/liquidar`,
      data
    );
  }

  anularMision(misionAnulada: IAnularMision, usuario: string) {
    const data = {
      misionAnulada: misionAnulada,
      usuario: usuario,
    };
    console.log("interfaz: ", misionAnulada);
    return this.http.post(
      `${this.baseUrl}/asignacionvale/anular`,
      data
    );
  }

  getSolicitudVale(codigo: string) {
    return this.http.get<ISolicitudValeAprobar>(
      `${this.baseUrl}/asignacionvale/listarsolicitudvalecodigo/${codigo}`
    );
  }

  async mensajesConfirmarDevolucion(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de devolver?",
    label: string = "Algunos datos no se podrán revertir, digite: ",
    palabraClave: string = "devolver"
  ) {
    let estado = false;
    const palabra = palabraClave;

    const { value: valorPalabra } = await Swal.fire({
      icon: icono,
      title: title,
      input: "text",
      inputLabel: label + palabraClave,
      inputValue: "",
      showCancelButton: true,
      confirmButtonColor: "#972727",
      confirmButtonText: "Aceptar",
      cancelButtonColor: "#2c3136",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "¡Tiene que escribir algo!";
        }
        if (value != palabra) {
          return "¡No coincide!";
        }
      },
    });

    if (valorPalabra) {
      estado = true;
    }

    return estado;
  }
  async mensajesConfirmarLiquidacion(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de liquidar?",
    label: string = "Algunos datos no se podrán revertir, digite: ",
    palabraClave: string = "liquidar"
  ) {
    let estado = false;
    const palabra = palabraClave;

    const { value: valorPalabra } = await Swal.fire({
      icon: icono,
      title: title,
      input: "text",
      inputLabel: label + palabraClave,
      inputValue: "",
      showCancelButton: true,
      confirmButtonColor: "#972727",
      confirmButtonText: "Aceptar",
      cancelButtonColor: "#2c3136",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "¡Tiene que escribir algo!";
        }
        if (value != palabra) {
          return "¡No coincide!";
        }
      },
    });

    if (valorPalabra) {
      estado = true;
    }

    return estado;
  }

  async mensajesConfirmarAnular(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de Anular?",
    label: string = "Algunos datos no se podrán revertir, digite: ",
    palabraClave: string = "anular"
  ) {
    let estado = false;
    const palabra = palabraClave;

    const { value: valorPalabra } = await Swal.fire({
      icon: icono,
      title: title,
      input: "text",
      inputLabel: label + palabraClave,
      inputValue: "",
      showCancelButton: true,
      confirmButtonColor: "#972727",
      confirmButtonText: "Aceptar",
      cancelButtonColor: "#2c3136",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "¡Tiene que escribir algo!";
        }
        if (value != palabra) {
          return "¡No coincide!";
        }
      },
    });

    if (valorPalabra) {
      estado = true;
    }

    return estado;
  }
}
