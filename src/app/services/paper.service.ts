import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { PersonaPaper } from "../models/personaPaper.model";
@Injectable({
  providedIn: 'root'
})
export class PaperService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getPapers() {
    return this.http.get<PersonaPaper[]>(`${this.api}/paper`);
  }
  getPaper(id: string) {
    return this.http.get<PersonaPaper>(`${this.api}/paper/${id}`);
  }
  insertPaper(paper:PersonaPaper): any{
    
    return this.http.post<PersonaPaper>(`${this.api}/paper`,paper);
  }
  editPaper(id: string, paper:PersonaPaper): any {
    return this.http.put(`${environment.api}/paper/${id}`, paper);
  }
  deletepaper(id: string) {
    return this.http.delete(`${environment.api}/paper/${id}`); 
  }
  /* Actualizar comprobante de pago */
  updatePaper(paper:PersonaPaper):any{
    return this.http.put(`${environment.api}/paper/${paper.id_inscripcion}`, paper);
  }
}
