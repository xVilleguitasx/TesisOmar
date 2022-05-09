import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { EnvioTrabajosFechas } from "../models/envioTrabajosFechas.model";
@Injectable({
  providedIn: 'root'
})
export class EnvioTrabajosFechasService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertEnvioTrabajoFecha(item:any): any{
    return this.http.post<EnvioTrabajosFechas>(`${this.api}/envioTrabajosFechas`,item);
  }
  getEnvioTrabajoFechas() {
    return this.http.get<EnvioTrabajosFechas[]>(`${this.api}/envioTrabajosFechas`);
  }
  getIEnvioTrabajoFecha(id: string) {
    return this.http.get<EnvioTrabajosFechas>(`${this.api}/envioTrabajosFechas/${id}`);
  }

  editEnvioTrabajoFecha(id:number, item: any) {
    return this.http.put(`${environment.api}/envioTrabajosFechas/${id}`, item);
  }
  deleteEnvioTrabajoFecha(id: string) {
    return this.http.delete(`${environment.api}/envioTrabajosFechas/${id}`); 
  }
 
}
