import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Idioma } from "../models/idioma.model";
@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertIdioma(idioma:Idioma): any{
    return this.http.post<Idioma>(`${this.api}/idioma`,idioma);
  }
  getIdiomas() {
    return this.http.get<Idioma[]>(`${this.api}/idioma`);
  }
  getIdioma(id: string) {
    return this.http.get<Idioma>(`${this.api}/idioma/${id}`);
  }

  editIdioma( idioma: Idioma) {
    return this.http.put(`${environment.api}/idioma/${idioma.id}`, idioma);
  }
  deleteIdioma(id: string) {
    return this.http.delete(`${environment.api}/idioma/${id}`); 
  }
 
}
