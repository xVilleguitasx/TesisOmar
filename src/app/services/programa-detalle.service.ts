
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { ProgramaDetalle } from "../models/programaDetalle.model";
@Injectable({
  providedIn: 'root'
})
export class ProgramaDetalleService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getProgramaDetalle() {
    return this.http.get<ProgramaDetalle[]>(`${this.api}/programaDetalle`);
  }
  getProgramaDetalleByID(id: string) {
    return this.http.get<ProgramaDetalle>(`${this.api}/programaDetalle/${id}`);
  }
  insertProgramaDetalle(programaDetalle:any): any{
    return this.http.post<ProgramaDetalle>(`${this.api}/programaDetalle`,programaDetalle);
  }
  editProgramaDetalle(id: any, programaDetalle: any): any {
    return this.http.put(`${environment.api}/programaDetalle/${id}`,programaDetalle);
  }
  deleteProgramaDetalle(id: string) {
    return this.http.delete(`${environment.api}/programaDetalle/${id}`); 
  }
}
