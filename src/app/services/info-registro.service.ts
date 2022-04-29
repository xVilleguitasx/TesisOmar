import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { InfoRegistro } from "../models/infoRegistro.model";
import { EliminarArchivosService } from "./eliminar-archivos.service";
@Injectable({
  providedIn: 'root'
})
export class InfoRegistroService {

  api: string = environment.api;
  constructor(private http: HttpClient, private _eliminar:EliminarArchivosService) {}

  getInfoRegistros() { 
    return this.http.get<InfoRegistro[]>(`${this.api}/infoRegistro`);
  }
  getInfoRegistro(id: string) {
    return this.http.get<InfoRegistro>(`${this.api}/infoRegistro/${id}`);
  }
  insertInfoRegistro(infoRegistro: any): any {
    return this.http.post<InfoRegistro>(
      `${this.api}/infoRegistro`,
      infoRegistro
    );
  } 
  editInfoRegistro(id:number, infoRegistro: any): any {
    return this.http.put(`${environment.api}/infoRegistro/${id}`, infoRegistro);
  }
  deleteInfoRegistro(item: InfoRegistro){
    this._eliminar.eliminarArchivos(item.imagen).subscribe(()=> {});
    return this.http.delete(`${environment.api}/infoRegistro/${item.id}`);
  }
}
