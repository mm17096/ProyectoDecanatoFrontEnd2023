export interface IEntradaSalida{
    id:string;
    tipo: string;
    fecha: string;
    hora:string;
    combustible:string;
    kilometraje:string;
}

export class EntradaSalidaI {
    constructor(
        public tipo: string,
        public fecha: string,
        public hora:string,
        public combustible:string,
        public kilometraje:string
){}
  }