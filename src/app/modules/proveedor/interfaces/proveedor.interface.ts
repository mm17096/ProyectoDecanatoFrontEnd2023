export interface IProveedor {
  id:        string;
  nombre:    string;
  encargado: string;
  telefono:  string;
  email:     string;
  direccion: string;
  tipo:      number;
  estado?:    number;
}
