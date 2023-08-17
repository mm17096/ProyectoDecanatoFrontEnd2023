export interface ICompra {
  codigoCompra:    number;
  factura:         string;
  proveedor:       string;
  cantidad:        number;
  cod_inicio:      number;
  cod_fin:         number;
  fecha:           Date;
  precio_unitario: number;
  total_compra:    number;
}
