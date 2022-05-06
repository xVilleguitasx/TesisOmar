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
  insertPrograma(item:Programa): any{
    return this.http.post<Programa>(`${this.api}/programa`,item);
  }
  getPrograma() {
    return this.http.get<Programa[]>(`${this.api}/programa`);
  }
  getIProgramas(id: string) {
    return this.http.get<Programa>(`${this.api}/programa/${id}`);
  }

  editPrograma( item: Programa) {
    return this.http.put(`${environment.api}/programa/${item.id}`, item);
  }
  deletePrograma(id: string) {
    return this.http.delete(`${environment.api}/programa/${id}`); 
  }
}
