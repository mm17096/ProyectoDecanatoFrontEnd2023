import { Authorities } from "./Authorities";
import { Empleado } from "./Empleado";

export interface Solicitante{
    codigoUsuario?:string;
    email?:string;
    nombre?:string;
    clave?:string;
    nuevo?:boolean;
    role?:string;
    empleado?:Empleado;
    enabled?:boolean;
    password?:string;
    accountNonExpired?:boolean;
    credentialsNonExpired?:boolean;
    username?:string;
    authorities?:Authorities[];
    accountNonLocked?:boolean;

}
