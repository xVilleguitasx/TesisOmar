
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Temario } from "../models/temario.model";
@Injectable({
  providedIn: 'root'
})
export class TemarioService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertTemario(item:Temario): any{
    return this.http.post<Temario>(`${this.api}/temario`,item);
  }
  getTemarios() {
    return this.http.get<Temario[]>(`${this.api}/temario`);
  }
  getTemario(id: string) {
    return this.http.get<Temario>(`${this.api}/temario/${id}`);
  }

  editTemarios(id:number, item: Temario) {
    return this.http.put(`${environment.api}/temario/${id}`, item);
  }
  deleteTemario(id: string) {
    return this.http.delete(`${environment.api}/temario/${id}`); 
  }
}
