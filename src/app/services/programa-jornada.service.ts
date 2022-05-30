
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { ProgramaJornada } from "../models/programaJornada.model";
@Injectable({
  providedIn: 'root'
})
export class ProgramaJornadaService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getProgramaJornada() {
    return this.http.get<ProgramaJornada[]>(`${this.api}/programaJornada`);
  }
  getProgramaJornadaByID(id: string) {
    return this.http.get<ProgramaJornada>(`${this.api}/programaJornada/${id}`);
  }
  insertProgramaJornada(programaJornada:any): any{
    return this.http.post<ProgramaJornada>(`${this.api}/programaJornada`,programaJornada);
  }
  editProgramaJornada(id: string, programaJornada: any): any {
    return this.http.put(`${environment.api}/programaJornada/${id}`,programaJornada);
  }
  deleteProgramaJornada(id: string) {
    return this.http.delete(`${environment.api}/programaJornada/${id}`); 
  }
}
