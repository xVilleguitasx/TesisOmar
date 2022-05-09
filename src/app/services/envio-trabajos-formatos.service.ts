import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { EnvioTrabajosFormato } from "../models/envioTrabajosFormatos.model";
@Injectable({
  providedIn: 'root'
})
export class EnvioTrabajosFormatosService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertEnvioTrabajoFormato(item:any): any{
    console.log(item)
    return this.http.post<EnvioTrabajosFormato>(`${this.api}/envioTrabajosFormatos`,item);
  }
  getEnvioTrabajoFormatos() {
    return this.http.get<EnvioTrabajosFormato[]>(`${this.api}/envioTrabajosFormatos`);
  }
  getIEnvioTrabajoFormato(id: string) {
    return this.http.get<EnvioTrabajosFormato>(`${this.api}/envioTrabajosFormatos/${id}`);
  }

  editEnvioTrabajoFormato( id:number,item: any) {
    return this.http.put(`${environment.api}/envioTrabajosFormatos/${id}`, item);
  }
  deleteEnvioTrabajoFormato(id: string) {
    return this.http.delete(`${environment.api}/envioTrabajosFormatos/${id}`); 
  }
}
