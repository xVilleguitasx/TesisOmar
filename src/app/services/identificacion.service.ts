import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Identificacion } from "../models/identificacion.model";
@Injectable({
  providedIn: "root",
})
export class IdentificacionService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getIdentificaciones() {
    return this.http.get<Identificacion[]>(`${this.api}/identificacion`);
  }
  getIdentificacion(id: string) {
    return this.http.get<Identificacion>(`${this.api}/identificacion/${id}`);
  }

  editIdentificacionesa(id: string, identificacion: Identificacion) {}
  deleteIdentificaciones(id: string) {}
  updateIdentificaciones(id: string, identificacion: Identificacion) {}
}
