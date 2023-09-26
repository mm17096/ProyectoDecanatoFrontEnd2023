import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

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
      confirmButtonColor: '#972727',
    })
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
      confirmButtonColor: '#972727',
      confirmButtonText: "Aceptar",
      cancelButtonColor: '#2c3136',
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        estado = true;
      }else{
        estado = false;
      }
    });

    return estado;
  }
}
