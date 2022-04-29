import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class EliminarArchivosService {

 
  
    api: string = environment.api;
    constructor(private http: HttpClient) {}
  

    eliminarArchivos(url:string): any{
      const archivo = {
        url:url
      }
      return this.http.post(`${this.api}/eliminarArchivos`,archivo);
    }

  }
  

