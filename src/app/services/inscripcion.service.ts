
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { Inscripcion } from "../models/inscripcion.model";

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getInscripciones() {
    return this.http.get<Inscripcion[]>(`${this.api}/inscripcion`);
  }
  getInscripcion(id: string) {
    return this.http.get<Inscripcion>(`${this.api}/inscripcion/${id}`);
  }
  insertInscripcion(inscripcion:Inscripcion): any{
    return this.http.post<Inscripcion>(`${this.api}/inscripcion`,inscripcion);
  }
  editInscripcion(id: string, inscripcion: any): any {
    return this.http.put(`${environment.api}/inscripcion/${id}`, inscripcion);
  }
  deleteInscripcion(id: string) {
    return this.http.delete(`${environment.api}/inscripcion/${id}`); 
  }
  /* Actualizar comprobante de pago */
  updateComprobante(id: string, inscripcion: any):any{
    return this.http.put(`${environment.api}/verificar/${id}`, inscripcion);
  }
  updateFactura(id: string, inscripcion: any):any{
    return this.http.put(`${environment.api}/factura/${id}`, inscripcion);
  }

}
