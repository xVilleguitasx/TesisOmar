import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Pago } from "../models/pago.model";
@Injectable({
  providedIn: 'root'
})
export class PagoService {

 
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getPagos() {
    return this.http.get<Pago[]>(`${this.api}/pago`);
  }
  getPago(id: string) {
    return this.http.get<Pago>(`${this.api}/pago/${id}`);
  }

  editPago(id: string, paper: Pago) {}
  deletePago(id: string) {}
  updatePago(id: string, paper: Pago) {}
}
