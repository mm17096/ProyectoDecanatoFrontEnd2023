export interface IAsignacionDetalle{
  idAsignacionVale: string;
  fechaAsignacion: string;
  mision: string;
  vales: [
      {
          idVale: null,
          correlativo: number;
      },
  ]
}
