import { SolicitudVale } from "./IsolicitudvaleDocument";

export interface IDocumentosvale{
    codigodocumentos: string;
    comprobante: string;
    fecha: string;
    foto:string;
    tipo:string;
    url:string;
    solicitudvale: string;
}



export class valeDocumentosI{
    constructor(
    public tipo:string,
    public foto:string,
    public url: String,
    public comprobante: string,
    public fecha: string,
    ){}
    
}