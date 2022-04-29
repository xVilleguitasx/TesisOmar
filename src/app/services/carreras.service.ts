import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Carrera } from "../models/carrera.model";
@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertCarrera(carrera:Carrera): any{
    return this.http.post<Carrera>(`${this.api}/carreras`,carrera);
  }
  getCarreras() {
    return this.http.get<Carrera[]>(`${this.api}/carreras`);
  }
  getCarrera(id: string) {
    return this.http.get<Carrera>(`${this.api}/carreras/${id}`);
  }

  editCarrera(carrera: Carrera) {
    return this.http.put(`${environment.api}/carreras/${carrera.id}`, carrera);
  }
  deleteCarrera(id: string) {
    return this.http.delete(`${environment.api}/carreras/${id}`);
  }

}
