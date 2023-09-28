import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/account/auth/models/usuario.models';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {

  storage: Storage = window.localStorage;

  constructor() { }

  ngOnInit(): void {
    this.empleado;
    console.log(this.empleado);
  }

  get empleado(): Empleado | null {
    const usuarioString = this.storage.getItem("usuario");
    if (usuarioString) {
      const usuarioObj = JSON.parse(usuarioString);
      return usuarioObj.empleado;
    }
    return null;
  }

  get fotoempleado(): string | null {
    const foto = this.storage.getItem("empleadoFoto");
    if (foto) {
      return foto;
    }
    return "./../../../assets/images/Default-Avatar.png";
  }

}
