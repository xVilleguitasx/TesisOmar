
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { Inicio } from "../models/inicio.model";

@Injectable({
  providedIn: 'root'
})
export class InicioService {


  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getInicio() {
    return this.http.get<Inicio[]>(`${this.api}/inicio`);
  }
  getInicioByID(id: string) {
    return this.http.get<Inicio>(`${this.api}/inicio/${id}`);
  }
  insertInicio(inicio:any): any{
    return this.http.post<Inicio>(`${this.api}/inicio`,inicio);
  }
  editInicio(id: string, inicio: any): any {
    return this.http.put(`${environment.api}/inicio/${id}`,inicio);
  }
  deleteInicio(id: string) {
    return this.http.delete(`${environment.api}/inicio/${id}`); 
  }
}
