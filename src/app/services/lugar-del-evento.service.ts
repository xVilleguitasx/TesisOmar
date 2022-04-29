import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LugarDelEvento } from "../models/lugarDelEvento.model";
@Injectable({
  providedIn: 'root'
})
export class LugarDelEventoService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getLugarDelEvento() {
    return this.http.get<LugarDelEvento[]>(`${this.api}/lugarDelEvento`);
  }
  getLugarEventobyId(id: string) {
    return this.http.get<LugarDelEvento>(`${this.api}/lugarDelEvento/${id}`);
  }
  insertLugarDelEvento(lugarDelEvento:any): any{
    return this.http.post<LugarDelEvento>(`${this.api}/lugarDelEvento`,lugarDelEvento);
  }
  editLugarDelEvento(id: number, lugarDelEvento: any): any {
    return this.http.put(`${environment.api}/lugarDelEvento/${id}`, lugarDelEvento);
  }
  deleteLugarDelEvento(id: string) {
    return this.http.delete(`${environment.api}/lugarDelEvento/${id}`);
  }
}
