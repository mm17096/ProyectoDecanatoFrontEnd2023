export interface IAsignacionDetalle{
  idAsignacionVale: string;
  fechaAsignacion: string;
  mision: string;
  vales: [
      {
          idVale: string;
          codigoVale: number;
      },
  ]
}
