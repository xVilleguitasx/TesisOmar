import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { ImagenesPortada } from '../models/imagenesPortada.model';
@Injectable({
  providedIn: 'root'
})
export class ImagenPortadaService {

  api: string = environment.api;
  constructor(private http: HttpClient) {}
  
  getImagenesPortada() {
    return this.http.get<ImagenesPortada[]>(`${this.api}/imagenesPortada`);
  }
  insertImagenPortada(img:any): any{ 
    return this.http.post<ImagenesPortada>(`${this.api}/imagenesPortada`,img);
  }
  getImagenPortada(id: string) {
    return this.http.get<ImagenesPortada>(`${this.api}/imagenesPortada/${id}`);
  }
  editImagenPortada(id:string,img: any) {
    return this.http.put(`${environment.api}/imagenesPortada/${id}`, img);
  }
  deleteImagenPortada(id: string) {
    return this.http.delete(`${environment.api}/imagenesPortada/${id}`);
  }
}
