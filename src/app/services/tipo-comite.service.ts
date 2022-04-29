import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { TipoComite } from "../models/tipoComite.model";
@Injectable({
  providedIn: 'root'
})
export class TipoComiteService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getTipoComite() {
    return this.http.get<TipoComite[]>(`${this.api}/tipoComite`);
  }
}
