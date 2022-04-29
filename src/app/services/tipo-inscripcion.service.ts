import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { TipoInscripcion } from "../models/tipoInscripcion.model";


@Injectable({
  providedIn: 'root'
})
export class TipoInscripcionService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertTipoInscripcion(inscripcion:TipoInscripcion): any{
    return this.http.post<TipoInscripcion>(`${this.api}/tipoInscripcion`,inscripcion);
  }
  getTipoInscripciones() {
    return this.http.get<TipoInscripcion[]>(`${this.api}/tipoInscripcion`);
  }
  getTipoInscripcion(id: string) {
    return this.http.get<TipoInscripcion>(`${this.api}/tipoInscripcion/${id}`);
  }

  editTipoInscripcion(item: TipoInscripcion) {
    return this.http.put(`${environment.api}/tipoInscripcion/${item.id}`, item);
  }
  deleteTipoInscripcion(id: string) {}
  updateTipoInscripcion(id: string, tipo: TipoInscripcion) {}
}
