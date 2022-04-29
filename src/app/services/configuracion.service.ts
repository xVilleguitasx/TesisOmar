import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Config } from "../models/config.model";
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getConf() {
    return this.http.get<Config[]>(`${this.api}/configuracion`);
  }
  editConf( conf: Config): any {
    return this.http.put(`${environment.api}/configuracion/${conf.id}`, conf);
  }
}
