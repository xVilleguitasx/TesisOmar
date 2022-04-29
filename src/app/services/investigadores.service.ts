import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Investigador } from "../models/investigador.model";
import { EliminarArchivosService } from "./eliminar-archivos.service";
@Injectable({
  providedIn: 'root'
})
export class InvestigadoresService {

  api: string = environment.api;
  constructor(private http: HttpClient, private _eliminar:EliminarArchivosService) {}

  getInvestigadores() {
    return this.http.get<Investigador[]>(`${this.api}/investigador`);
  }
  getEdicion(id: string) {
   
  }
  insertInvestigador(investigador:any): any{
    return this.http.post(`${this.api}/investigador`,investigador);
  }
  editInvestigador(id: string, investigador: any): any {
    return this.http.put(`${environment.api}/investigador/${id}`, investigador);
  }
  deleteInvestigador(item: Investigador) {
    console.log(item.foto)
     this._eliminar.eliminarArchivos(item.foto).subscribe(()=> {});;
     this._eliminar.eliminarArchivos(item.hoja_de_vida).subscribe(()=> {});;
    return this.http.delete(`${environment.api}/investigador/${item.id}`);
  }
}
