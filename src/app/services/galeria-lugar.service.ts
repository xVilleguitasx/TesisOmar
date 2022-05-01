import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Galeria } from "../models/galeria";

@Injectable({
  providedIn: 'root'
})
export class GaleriaLugarService {
      api: string = environment.api;
      constructor(private http: HttpClient) {}
      insertGaleria(galeria:any): any{
        console.log(galeria)
        return this.http.post<Galeria>(`${this.api}/galeriaLugar`,galeria);
      }
      getGaleria() {
        return this.http.get<Galeria[]>(`${this.api}/galeriaLugar`);
      }
    
      editGaleria(id:number, galeria: any) {
        return this.http.put(`${environment.api}/galeriaLugar/${id}`, galeria);
      }
      deleteGaleria(id: string) {
        return this.http.delete(`${environment.api}/galeriaLugar/${id}`); 
      }
     
    
    
  }