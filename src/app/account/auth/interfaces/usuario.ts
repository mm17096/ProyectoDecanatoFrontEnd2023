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

export interface ILoginUsuario {
  nombre: string;
  clave: string;
}

export interface IEmail {
  asunto: string;
  titulo: string;
  email: string;
  receptor: string;
  mensaje: string;
  centro: string;
  codigo: string;
  abajo: string;
}