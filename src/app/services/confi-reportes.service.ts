import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { confiReportes } from "../models/confiReportes.model";

@Injectable({
  providedIn: 'root'
})
export class ConfiReportesService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getConfiReportes() {
    return this.http.get<confiReportes[]>(`${this.api}/confiReportes`);
  }

  editConfiReporte(id,reporte: any): any {
    return this.http.put(`${environment.api}/confiReportes/${id}`, reporte);
  }

}
