import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class MensajesService {
  constructor() {}

  mensajesToast(
    icono: SweetAlertIcon = "info",
    title: string = "Registrado con éxito!"
  ) {
    Swal.fire({
      icon: icono,
      title: title,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  }

  mensajesSweet(
    icono: SweetAlertIcon = "info",
    title: string = "Registrado con éxito!",
    text: string = "Datos almacenados exitosamente",
    boton: string = "Ok"
  ) {
    Swal.fire({
      icon: icono,
      title: title,
      text: text,
      confirmButtonText: boton,
      confirmButtonColor: "#972727",
    });
  }

  async mensajesConfirmar(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de guardar?",
    label: string = "Algunos datos no se podrán revertir, digite: ",
    palabraClave: string = "guardar"
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
  async mensajeAsignacionAnular(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de anular la solicitud?",
    label: string = "La acción no se podrá deshacer, digite: ",
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

  async mensajeAsignar(
    icono: SweetAlertIcon = "warning",
    title: string = "Se asignarán los vales correspondientes",
    label: string = "¿Esta seguro de asignar los vales?"
  ) {
    let estado = false;

    await Swal.fire({
      icon: icono,
      title: title,
      text: label,
      showCancelButton: true,
      confirmButtonColor: "#972727",
      confirmButtonText: "Aceptar",
      cancelButtonColor: "#2c3136",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        estado = true;
      } else {
        estado = false;
      }
    });

    return estado;
  }
  async mensajeSolicitarAprobacion(
    icono: SweetAlertIcon = "warning",
    title: string = "Se solicitará al jefe de unidad la aprobación de la solicitud",
    label: string = "¿Esta seguro?"
  ) {
    let estado = false;

    await Swal.fire({
      icon: icono,
      title: title,
      text: label,
      showCancelButton: true,
      confirmButtonColor: "#972727",
      confirmButtonText: "Aceptar",
      cancelButtonColor: "#2c3136",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        estado = true;
      } else {
        estado = false;
      }
    });

    return estado;
  }
  async mensajeSolicitudAprobada(
    cantVales: number,
    icono: SweetAlertIcon = "warning",
    title: string = "Aprobará la solicutd con " + cantVales + " Vales",
    label: string = "¿Esta seguro?"
  ) {
    let estado = false;

    await Swal.fire({
      icon: icono,
      title: title,
      text: label,
      showCancelButton: true,
      confirmButtonColor: "#972727",
      confirmButtonText: "Aceptar",
      cancelButtonColor: "#2c3136",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        estado = true;
      } else {
        estado = false;
      }
    });

    return estado;
  }
  async mensajeSolicitudRevision(
    icono: SweetAlertIcon = "warning",
    title: string = "Se enviará para que pueda ser revisada",
    label: string = "¿Esta seguro?"
  ) {
    let estado = false;

    await Swal.fire({
      icon: icono,
      title: title,
      text: label,
      showCancelButton: true,
      confirmButtonColor: "#972727",
      confirmButtonText: "Aceptar",
      cancelButtonColor: "#2c3136",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        estado = true;
      } else {
        estado = false;
      }
    });

    return estado;
  }

  async mensajeAprobar(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de aprobar la solicitud?",
    label: string = "La acción no se podrá deshacer, digite: ",
    palabraClave: string = "confirmar"
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
      confirmButtonColor: '#972727',
      confirmButtonText: "Aceptar",
      cancelButtonColor: '#2c3136',
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

  async mensajeRevision(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de mandar la solicitud a la secretaria para revisión?",
    label: string = "La acción no se podrá deshacer, digite: ",
    palabraClave: string = "confirmar"
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
      confirmButtonColor: '#972727',
      confirmButtonText: "Aceptar",
      cancelButtonColor: '#2c3136',
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

  async mensajeAnular(
    icono: SweetAlertIcon = "warning",
    title: string = "¿Está seguro de anular la solicitud?",
    label: string = "La acción no se podrá deshacer, digite: ",
    palabraClave: string = "confirmar"
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
      confirmButtonColor: '#972727',
      confirmButtonText: "Aceptar",
      cancelButtonColor: '#2c3136',
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
