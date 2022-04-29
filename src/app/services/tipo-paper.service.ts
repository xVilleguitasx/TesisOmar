
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Paper } from "../models/paper.model";
@Injectable({
  providedIn: 'root'
})
export class TipoPaperService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}

  insertPaper(paper:Paper): any{
    return this.http.post<Paper>(`${this.api}/tipoPaper`,paper);
  }
  getPapers() {
    return this.http.get<Paper[]>(`${this.api}/tipoPaper`);
  }
  getPaper(id: string) {
    return this.http.get<Paper>(`${this.api}/tipoPaper/${id}`);
  }

  editPaper(paper: Paper): any {
    return this.http.put(`${environment.api}/tipoPaper/${paper.id}`, paper);
  }
  deletePaper(id: string) {
    return this.http.delete(`${environment.api}/tipoPaper/${id}`);
  }
}
