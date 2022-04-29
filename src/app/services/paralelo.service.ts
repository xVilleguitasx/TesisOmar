import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Paralelo } from "../models/paralelo.model";
@Injectable({
  providedIn: "root",
})
export class ParaleloService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getParalelos() {
    return this.http.get<Paralelo[]>(`${this.api}/paralelo`);
  }
  getParalelo(id: string) {
    return this.http.get<Paralelo>(`${this.api}/paralelo/${id}`);
  }

  editParalelo(id: string, paralelo: Paralelo) {}
  deleteParalelo(id: string) {}
  updateParalelo(id: string, paralelo: Paralelo) {}
}
