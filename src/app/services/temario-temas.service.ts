
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { TemarioTemas } from "../models/temarioTemas.model";
@Injectable({
  providedIn: 'root'
})
export class TemarioTemasService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  insertTemarioTemas(item:any): any{
    return this.http.post<TemarioTemas>(`${this.api}/temarioTemas`,item);
  }
  getTemarioTemas() {
    return this.http.get<TemarioTemas[]>(`${this.api}/temarioTemas`);
  }
  getTemarioTema(id: string) {
    return this.http.get<TemarioTemas>(`${this.api}/temarioTemas/${id}`);
  }

  editTemarioTemas(id:number, item: any) {
    return this.http.put(`${environment.api}/temarioTemas/${item.id}`, item);
  }
  deleteTemarioTemas(id: string) {
    return this.http.delete(`${environment.api}/temarioTemas/${id}`); 
  }
}
