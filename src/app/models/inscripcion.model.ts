export interface Inscripcion {
  id?: string;
  id_per_pert: string;
  id_tipopago: number;
  cod_pago?: number;
  resultado_autorizacion?: string;
  codigo_autorizacion?: string;
  foto_deposito?: string;
  fecha_inscripcion: string;
  estado: string;
  num_deposito?: string;
  id_idioma: number;
  fecha_Registro_de_validacion?: string;
  Hora_Registro_Deposito?: string;
  Hora_Validacion_Deposito?: string;
  fecha_validacion_deposito?: string;
  Hora_Inscripcion: string;
}