
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { InicioGaleria } from "../models/inicioGaleria.model";
@Injectable({
  providedIn: 'root'
})
export class InicioGaleriaService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getInicioGaleria() {
    return this.http.get<InicioGaleria[]>(`${this.api}/inicioGaleria`);
  }
  getInicioGaleriaByID(id: string) {
    return this.http.get<InicioGaleria>(`${this.api}/inicioGaleria/${id}`);
  }
  insertInicioGaleria(inicioGaleria:any): any{
    return this.http.post<InicioGaleria>(`${this.api}/inicioGaleria`,inicioGaleria);
  }
  editInicioGaleria(id: any, inicioGaleria: any): any {
    return this.http.put(`${environment.api}/inicioGaleria/${id}`,inicioGaleria);
  }
  deleteInicioGaleria(id: string) {
    return this.http.delete(`${environment.api}/inicioGaleria/${id}`); 
  }
}
