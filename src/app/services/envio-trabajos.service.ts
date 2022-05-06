import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { EnvioTrabajos } from "../models/envioTrabajos.model";
@Injectable({
  providedIn: 'root'
})
export class EnvioTrabajosService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertEnvioTrabajo(item:EnvioTrabajos): any{
    return this.http.post<EnvioTrabajos>(`${this.api}/envioTrabajos`,item);
  }
  getEnvioTrabajos() {
    return this.http.get<EnvioTrabajos[]>(`${this.api}/envioTrabajos`);
  }
  getIEnvioTrabajo(id: string) {
    return this.http.get<EnvioTrabajos>(`${this.api}/envioTrabajos/${id}`);
  }

  editEnvioTrabajo( item: EnvioTrabajos) {
    return this.http.put(`${environment.api}/envioTrabajos/${item.id}`, item);
  }
  deleteEnvioTrabajo(id: string) {
    return this.http.delete(`${environment.api}/envioTrabajos/${id}`); 
  }
}
