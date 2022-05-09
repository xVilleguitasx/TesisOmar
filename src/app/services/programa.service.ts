import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Programa } from "../models/programa.model";
@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertPrograma(item:any): any{
    return this.http.post<Programa>(`${this.api}/programa`,item);
  }
  getProgramas() {
    return this.http.get<Programa[]>(`${this.api}/programa`);
  }
  getPrograma(id: string) {
    return this.http.get<Programa>(`${this.api}/programa/${id}`);
  }

  editPrograma(id:number, item: any) {
    return this.http.put(`${environment.api}/programa/${id}`, item);
  }
  deletePrograma(id: string) {
    return this.http.delete(`${environment.api}/programa/${id}`); 
  }
}
