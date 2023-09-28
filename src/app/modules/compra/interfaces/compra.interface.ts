import { IProveedor } from "../../proveedor/interfaces/proveedor.interface";

export interface ICompra {
  id:                           string;
  factura:                      string;
  proveedor:                    IProveedor;
  descripcion:                  string;
  cantidad?:                    number;
  codInicio?:                  number;
  codFin?:                     number;
  fechaCompra?:                string;
  fechaVencimiento?:           string;
  precioUnitario?:             number;
  totalCompra?:                number;
}
