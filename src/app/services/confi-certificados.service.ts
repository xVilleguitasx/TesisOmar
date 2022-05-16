import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment"
import { ConfiCertificados } from "../models/confiCertificados.model";

@Injectable({
  providedIn: 'root'
})
export class ConfiCertificadosService {


  api: string = environment.api;
  constructor(private http: HttpClient) {}
  
 /*  getConfiCertificados() {
    return this.http.get<ConfiCertificados[]>(`${this.api}/confiCertificados`);
  }
  getConfiCertificado(id: string) {
    return this.http.get<ConfiCertificados>(`${this.api}/confiCertificados/${id}`);
  }
  insertConfiCertificados(confi:any): any{ 
    return this.http.post<ConfiCertificados>(`${this.api}/confiCertificados`,confi);
  }
  
  editConfiCertificados(id:string,confi: any) {
    return this.http.put(`${environment.api}/confiCertificados/${id}`, confi);
  }
  deleteConfiCertificados(id: string) {
    return this.http.delete(`${environment.api}/confiCertificados/${id}`);
  } */
}
