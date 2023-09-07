export interface IVehiculos {
  codigoVehiculo:  string;
  placa:           string;
  modelo:          string;
  marca:           string;
  clase:           string;
  color:           string;
  year:            number;
  fecha_tarjeta:   Date;
  capacidad:       number;
  capacidadTanque: string;
  estado:          number;
  n_chasis:        string;
  n_motor:         string;
  tipo_gas:        string;
  nombrefoto:      null | string;
  urlfoto:         null | string;
}
