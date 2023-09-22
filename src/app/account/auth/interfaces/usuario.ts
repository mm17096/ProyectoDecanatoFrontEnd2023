export interface IRegistroUsuario {
    nombre: string;
    email: string;
    password: string;
    confirmpassword: string;
    terminos: boolean;
  }
  
  export interface ILoginUsuario {
    nombre: string;
    clave: string;
  }

  export interface IEmail{
    asunto: string;
    receptor: string;
    mensaje: string;
 }