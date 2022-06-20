import { Component, OnInit } from "@angular/core";
import { ImagenesPortada } from "../../models/imagenesPortada.model";
import { ImagenPortadaService } from "../../services/imagen-portada.service";
import { InformacionCongreso } from "../../models/informacionCongreso.model";
import { InformacionCongresoService } from "../../services/informacion-congreso.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-header-inicio",
  templateUrl: "./header-inicio.component.html",
  styleUrls: ["./header-inicio.component.css"],
})
export class HeaderInicioComponent implements OnInit {
  URL :  string = environment.api+"/";
  infoCongreso: InformacionCongreso = {
    id:1,
  nombre: "",
  titulo: "",
  fecha: "",
  logo: ""
  };
  imagenesPortada: ImagenesPortada[] = [];
  constructor(
    private _informacionCongresoService: InformacionCongresoService,
    private _imagenesPortada: ImagenPortadaService
  ) {}


  ngOnInit(): void {
    this.getInformacionCongreso();
    this.getImagenesPortada();
  }
  getImagenesPortada() {
    this._imagenesPortada.getImagenesPortada().subscribe((result) => {
      this.imagenesPortada = result.filter((element) => element.estado);
      this.imagenesPortada.forEach((element) => {
        element.link === null ? (element.link = "") : "";
      });
    });
  }
  active = 1;
  getInformacionCongreso() {
    this._informacionCongresoService.getInfoAll().subscribe((result) => {
      this.infoCongreso = result[0];
    });
  }
  abrirEnlaceImg(link:string){
    console.log(link);
    if(link!=null){
      window.open(link, '_blank');
    }
    
  }
  abrirEnlace(URL){
    if (URL != null  && URL!= '') {
      window.open(URL, "_blank");
    }
  }
}
