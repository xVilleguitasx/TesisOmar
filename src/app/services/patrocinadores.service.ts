import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Patrocinador } from "../models/patrocinador.model";
import { EliminarArchivosService } from "./eliminar-archivos.service";

@Injectable({
  providedIn: "root",
})
export class PatrocinadoresService {
  api: string = environment.api;
  constructor(private http: HttpClient,private _eliminar:EliminarArchivosService) {}

  getPatrocinadores() {
    return this.http.get<Patrocinador[]>(`${this.api}/patrocinador`);
  }
  getPatrocinador(id: string) {
    return this.http.get<Patrocinador>(`${this.api}/patrocinador/${id}`);
  }
  insertPatrocinador(patrocinador: any): any {
    return this.http.post<Patrocinador>(
      `${this.api}/patrocinador`,
      patrocinador
    );
  } 
  editPatrocinador(id:number, patrocinador: any): any {
    console.log(patrocinador.value);
    return this.http.put(`${environment.api}/patrocinador/${id}`, patrocinador);
  }
  deletePatrocinador(p: Patrocinador): any {
    console.log(p.imagen)
    this._eliminar.eliminarArchivos(p.imagen).subscribe(()=> {});
    return this.http.delete(`${environment.api}/patrocinador/${p.id}`);
  }
}
