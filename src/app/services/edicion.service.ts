import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Edicion } from "../models/edicion.model";
@Injectable({
  providedIn: 'root'
})
export class EdicionService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getEdiciones() {
    return this.http.get<Edicion[]>(`${this.api}/edicion`);
  }
  getEdicion(id: string) {
   
  }
  insertEdicion(edicion:any): any{
    return this.http.post<Edicion>(`${this.api}/edicion`,edicion);
  }
  editEdicion(id: string, edicion: any) {
    return this.http.put(`${environment.api}/edicion/${id}`, edicion);
  }
  deleteEdicion(id: string) {}
}
