import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Comite } from "../models/comite.model";
@Injectable({
  providedIn: 'root'
})
export class ComiteService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getComite() {
    return this.http.get<Comite[]>(`${this.api}/comite`);
  }
  getComiteById(id: string) {
    return this.http.get<Comite>(`${this.api}/comite/${id}`);
  }
  insertComite(comite:any): any{
    return this.http.post<Comite>(`${this.api}/comite`,comite);
  }
  editComite(comite: any): any {
    return this.http.put(`${environment.api}/comite/${comite.id}`, comite);
  }
  deleteComite(id: string) {
    return this.http.delete(`${environment.api}/comite/${id}`);
  }
}
