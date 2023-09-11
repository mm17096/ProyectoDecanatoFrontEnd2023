import { IEmpleado } from "src/app/modules/empleado/interface/empleado.interface";

export class Usuario {
  constructor(
    public codigoUsuario: string,
    public nombre: string,
    public clave?: string, // no necesariamente se tendra el pss aqui
    public nuevo?: string,
    public role?: string,
    public empleado?: IEmpleado,
  ) {}
}
