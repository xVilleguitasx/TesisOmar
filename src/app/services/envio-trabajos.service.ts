import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { EnvioTrabajos } from "../models/envioTrabajos.model";
import { NumberSymbol } from "@angular/common";
@Injectable({
  providedIn: 'root'
})
export class EnvioTrabajosService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertEnvioTrabajo(item:any): any{
    return this.http.post<EnvioTrabajos>(`${this.api}/envioTrabajos`,item);
  }
  getEnvioTrabajos() {
    return this.http.get<EnvioTrabajos[]>(`${this.api}/envioTrabajos`);
  }
  getIEnvioTrabajo(id: string) {
    return this.http.get<EnvioTrabajos>(`${this.api}/envioTrabajos/${id}`);
  }

  editEnvioTrabajo(id:number, item: any) {
    return this.http.put(`${environment.api}/envioTrabajos/${id}`, item);
  }
  deleteEnvioTrabajo(id: string) {
    return this.http.delete(`${environment.api}/envioTrabajos/${id}`); 
  }
}
