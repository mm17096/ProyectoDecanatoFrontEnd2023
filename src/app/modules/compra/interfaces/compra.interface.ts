import { IProveedor } from "../../proveedor/interfaces/proveedor.interface";

export interface ICompra {
  id:                           string;
  factura:                      string;
  proveedor:                    IProveedor;
  descripcion:                  string;
  cantidad?:                    number;
  cod_inicio?:                  number;
  cod_fin?:                     number;
  fecha_compra?:                string;
  fecha_vencimiento?:           string;
  precio_unitario?:             number;
  total_compra?:                number;
}
