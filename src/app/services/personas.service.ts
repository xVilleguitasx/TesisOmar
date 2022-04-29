import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Persona } from "../models/persona.model";
@Injectable({
  providedIn: "root",
})
export class PersonasService {
  api: string = environment.api;
  constructor(private http: HttpClient) {}

  getPersonas() {
    return this.http.get<Persona[]>(`${this.api}/personas`);
  }
  getPersona(id: string) {
    return this.http.get<Persona>(`${this.api}/personas/${id}`);
  }
  insertPersona(persona:Persona): any{
    return this.http.post<Persona>(`${this.api}/personas`,persona);
  }
  editPersona(id: string, persona: any): any {
    return this.http.put(`${environment.api}/personas/${id}`, persona);
  }
  deletePersona(id: string) {
    return this.http.delete(`${environment.api}/personas/${id}`);
  }
  
}
