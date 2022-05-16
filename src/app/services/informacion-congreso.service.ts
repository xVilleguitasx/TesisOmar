import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { InformacionCongreso } from '../models/informacionCongreso.model';

@Injectable({
  providedIn: 'root'
})
export class InformacionCongresoService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertInfo(info:InformacionCongreso): any{ 
    return this.http.post<InformacionCongreso>(`${this.api}/informacionCongreso`,info);
  }
  getInfoAll() {
    return this.http.get<InformacionCongreso[]>(`${this.api}/informacionCongreso`);
  }
  getInfo(id: string) {
    return this.http.get<InformacionCongreso>(`${this.api}/informacionCongreso/${id}`);
  }

  editInfo(id:string,info: any) {
    return this.http.put(`${environment.api}/informacionCongreso/${id}`, info);
  }
  deleteInfo(id: string) {
    return this.http.delete(`${environment.api}/informacionCongreso/${id}`);
  }
  
}
