import { Component, OnInit } from "@angular/core";
import { Edicion } from "../../../app/models/edicion.model";
import { EdicionService } from "../../../app/services/edicion.service";
import { Config } from "../../../app/models/config.model";
import { ConfiguracionService } from "../../../app/services/configuracion.service";

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
  edicionActual: Edicion;
  menuItems: any[];
  config: Config[] = [];
  constructor(
    private configService: ConfiguracionService,
    private edicionService: EdicionService
  ) {}

  ngOnInit() {
  
    this.getConf();
  }
  
  getConf() {
    this.configService.getConf().subscribe((result) => {
      this.config = result;
      this.config.forEach((element) => {
        if (element.estado) {
        } else {
          ROUTES = ROUTES.filter((item) => item.title != element.nombre);
          console.log(element);
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
