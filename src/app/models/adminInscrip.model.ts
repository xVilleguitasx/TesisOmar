export interface AdminsInscrip {
  estado: string;
  numero: number;
  di: string;
  apellidos?: string;
  nombres?: string;
  tipo_Inscrito: string;
  tipo_Pago: string;
  comprobante?: string;
  numero_Deposito?: string;
  correo: string;
  celular: string;
  direccion: string;
  factura: string;
  id_carrera_per?: number;
  id_semestre_per?: number;
  id_paralelo_per?: number;
  id_per_pert: number;
  certificado_I?:string;
  certificado_P?:string;
}
