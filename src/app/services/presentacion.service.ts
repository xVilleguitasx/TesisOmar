import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Presentacion } from "../models/presentacion.model";
@Injectable({
  providedIn: 'root'
})
export class PresentacionService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getPresentaciones() {
    return this.http.get<Presentacion[]>(`${this.api}/presentacion`);
  }
  getPresentacion(id: string) {
    return this.http.get<Presentacion>(`${this.api}/presentacion/${id}`);
  }
  insertPresentacion(presentacion:any): any{
    return this.http.post<Presentacion>(`${this.api}/presentacion`,presentacion);
  }
  editPresentacion(id: number, presentacion: any): any {
    return this.http.put(`${environment.api}/presentacion/${id}`, presentacion);
  }
  deletePresentacion(id: string) {
    return this.http.delete(`${environment.api}/presentacion/${id}`);
  }
}
