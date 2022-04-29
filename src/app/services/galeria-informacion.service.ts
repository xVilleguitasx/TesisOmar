import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Galeria } from "../models/galeria";
@Injectable({
  providedIn: 'root'
})
export class GaleriaInformacionService {


 
    api: string = environment.api;
    constructor(private http: HttpClient) {}
    insertGaleria(galeria:any): any{
      return this.http.post<Galeria>(`${this.api}/galeriaInformacion`,galeria);
    }
    getGaleria() {
      return this.http.get<Galeria[]>(`${this.api}/galeriaInformacion`);
    }
  
    editGaleria(id:number, galeria: any) {
      return this.http.put(`${environment.api}/galeriaInformacion/${id}`, galeria);
    }
    deleteGaleria(id: string) {
      return this.http.delete(`${environment.api}/galeriaInformacion/${id}`); 
    }
   
  
  
}