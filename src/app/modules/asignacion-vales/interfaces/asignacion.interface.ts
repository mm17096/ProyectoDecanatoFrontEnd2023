export interface IAsignacionDetalle {
  idAsignacionVale: string;
  fechaAsignacion: string;
  mision: string;
  vales: [
    {
      idVale: string;
      correlativo: number;
    }
  ];
}

export interface IValesADevolver {
  valesDevueltos:string [];
  estadoVales: number;
}
