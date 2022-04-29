
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { AdminsInscrip } from "../models/adminInscrip.model";

@Injectable({
  providedIn: 'root'
})
export class AdminInscripService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getInscripciones() {
    return this.http.get<AdminsInscrip[]>(`${this.api}/adminInscrip`);
  }
  /* getInscripcion(id: string) {
    return this.http.get<AdminsInscrip>(`${this.api}/adminInscrip/${id}`);
  }
  insertInscripcion(inscripcion:AdminsInscrip): any{
    return this.http.post<AdminsInscrip>(`${this.api}/adminInscrip`,inscripcion);
  }
  editInscripcion(id: string, inscripcion: AdminsInscrip): any {
    return this.http.put(`${environment.api}/adminInscrip/${id}`, inscripcion);
  }
  deleteInscripcion(id: string) {
    return this.http.delete(`${environment.api}/adminInscrip/${id}`); 
  }
  */
  update(id: string, inscripcion: any):any{
    return this.http.put(`${environment.api}/adminInscrip/${id}`, inscripcion);
  } 
}
