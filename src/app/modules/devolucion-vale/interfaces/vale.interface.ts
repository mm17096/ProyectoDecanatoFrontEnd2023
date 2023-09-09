import { ICompra } from "../../compra/interfaces/compra.interface";

export interface IVale {
  id:                 string;
  valor:              number;
  compra:             ICompra;
  fecha_vencimiento:  string;
  correlativo:        number;
}
