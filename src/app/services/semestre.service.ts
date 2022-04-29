import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Semestre } from "../models/semestre.model";
@Injectable({
  providedIn: 'root'
})
export class SemestreService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertSemestre(semestre:Semestre): any{
    return this.http.post<Semestre>(`${this.api}/semestres`,semestre);
  }
  getSemestres() {
    return this.http.get<Semestre[]>(`${this.api}/semestres`);
  }
  getSemestre(id: string) {
    return this.http.get<Semestre>(`${this.api}/semestres/${id}`);
  }

  editSemestre( semestre: Semestre) {
    return this.http.put(`${environment.api}/semestres/${semestre.id}`, semestre);
  }
  deleteSemestre(id: string) {}
  updateSemestre(id: string, semestre: Semestre) {}
}
