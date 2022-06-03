
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { ProgramaDias } from "../models/programaDias.model";
@Injectable({
  providedIn: 'root'
})
export class ProgramaDiasService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getProgramaDias() {
    return this.http.get<ProgramaDias[]>(`${this.api}/programaDias`);
  }
  getProgramaDiasByID(id: string) {
    return this.http.get<ProgramaDias>(`${this.api}/ProgramaDias/${id}`);
  }
  insertProgramaDias(ProgramaDias:any): any{
    return this.http.post<ProgramaDias>(`${this.api}/ProgramaDias`,ProgramaDias);
  }
  editProgramaDias(id: any, ProgramaDias: any): any {
    return this.http.put(`${environment.api}/ProgramaDias/${id}`,ProgramaDias);
  }
  deleteProgramaDias(id: string) {
    return this.http.delete(`${environment.api}/ProgramaDias/${id}`); 
  }
}
