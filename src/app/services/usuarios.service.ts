import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Usuarios } from "../models/usuarios.model";
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  getUsuarios() {
    return this.http.get<Usuarios[]>(`${this.api}/usuarios`);
  }
  getusuario(id: string) {
    return this.http.get<Usuarios>(`${this.api}/usuarios/${id}`);
  }

  editUsuario(usaurio: Usuarios): any {
    return this.http.put(`${environment.api}/usuarios/${usaurio.id}`, usaurio);
  }
  deleteUsuario(id: string) {
    return this.http.delete(`${environment.api}/usuarios/${id}`);
  }
}
