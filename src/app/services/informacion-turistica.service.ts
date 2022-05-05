import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Presentacion } from "../models/presentacion.model";
import { InformacionTuristica } from "../models/informacionTuristica.model";
@Injectable({
  providedIn: 'root'
})
export class InformacionTuristicaService {


  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getInformacionTuristicas() {
    return this.http.get<InformacionTuristica[]>(`${this.api}/informacionTuristica`);
  }
  getInformacionTuristica(id: string) {
    return this.http.get<InformacionTuristica>(`${this.api}/informacionTuristica/${id}`);
  }
  insertInformacionTuristica(informacionTuristica:any): any{
    return this.http.post<InformacionTuristica>(`${this.api}/informacionTuristica`,informacionTuristica);
  }
  editInformacionTuristica(id: number, informacionTuristica: any): any {
    return this.http.put(`${environment.api}/informacionTuristica/${id}`, informacionTuristica);
  }
  deleteInformacionTuristica(id: string) {
    return this.http.delete(`${environment.api}/informacionTuristica/${id}`);
  }
}
