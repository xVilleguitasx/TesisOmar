import { Component, OnInit } from "@angular/core";
import { Edicion } from "../../../app/models/edicion.model";
import { EdicionService } from "../../../app/services/edicion.service";
import { Config } from "../../../app/models/config.model";
import { ConfiguracionService } from "../../../app/services/configuracion.service";
import { InformacionCongreso } from "../../../app/models/informacionCongreso.model";
import { InformacionCongresoService } from "../../..//app/services/informacion-congreso.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export var ROUTES: RouteInfo[] = [
  {
    path: "/acerca-de",
    title: "Acerca De",
    icon: "fa fa-info-circle  ",
    class: "",
  },
  {
    path: "/registro",
    title: "Registro",
    icon: "fa fa-address-card",
    class: "",
  },
  {
    path: "/validacion",
    title: "Validación",
    icon: "fa fa-check-circle-o",
    class: "",
  },
  {
    path: "/certificado",
    title: "Certificado",
    icon: "fa fa-certificate",
    class: "",
  },
  {
    path: "/facturacion",
    title: "Facturación",
    icon: "fa fa-file-text-o",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  infoCongreso: InformacionCongreso = {
    id:1,
  nombre: "",
  titulo: "",
  fecha: "",
  logo: ""
  };
  menuItems: any[];
  config: Config[] = [];
  constructor(
    private configService: ConfiguracionService,
    private _edicionService: EdicionService,
    private _informacionCongresoService: InformacionCongresoService
  ) {}

  ngOnInit() {
  
    this.getConf();
    this.getInformacionCongreso();
  }
  getInformacionCongreso() {
    this._informacionCongresoService.getInfoAll().subscribe((result) => {
      this.infoCongreso = result[0];
    });
  }
  
  getConf() {
    this.configService.getConf().subscribe((result) => {
      this.config = result;
      this.config.forEach((element) => {
        if (element.estado) {
        } else {
          ROUTES = ROUTES.filter((item) => item.title != element.nombre);
        }
      });
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
    });
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
