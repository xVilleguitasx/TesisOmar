import { Component, OnInit } from "@angular/core";
import { Comite } from "../models/comite.model";
import { Edicion } from "../models/edicion.model";
import { Galeria } from "../models/galeria";
import { Investigador } from "../models/investigador.model";
import { LugarDelEvento } from "../models/lugarDelEvento.model";
import { Presentacion } from "../models/presentacion.model";
import { ComiteService } from "../services/comite.service";
import { EdicionService } from "../services/edicion.service";
import { GaleriaInformacionService } from "../services/galeria-informacion.service";
import { GaleriaLugarService } from "../services/galeria-lugar.service";
import { InvestigadoresService } from "../services/investigadores.service";
import { LugarDelEventoService } from "../services/lugar-del-evento.service";
import { PresentacionService } from "../services/presentacion.service";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"],
})
export class InicioComponent implements OnInit {
  active = 1;
  comite = 1;
  trabajos = 1;
  comiteOrganizador: Comite[] = [];
  comiteCientifico: Comite[] = [];
  ediciones: Edicion[] = [];
  investigadores: Investigador[] = [];
  galeriaLugar: Galeria[] = [];
  galeriaInformacion: Galeria[] = [];
  presentacion:Presentacion[] = [];
  lugarDelEvento: LugarDelEvento[] = [];
  URL = "http://localhost:3000/";
  constructor(
    private _comiteService: ComiteService,
    private _edicionService: EdicionService,
    private _investigadoresService: InvestigadoresService,
    private _galeriaLugarService: GaleriaLugarService,
    private _galeriaInformacionService: GaleriaInformacionService,
    private _presentacionService: PresentacionService,
    private _lugarDelEventoService: LugarDelEventoService
  ) {}

  ngOnInit(): void {
    this.getComite();
    this.getEdiciones();
    this.getInvestigadores();
    this.getSobreElEvento();
  }
  getSobreElEvento() {

    //Presentacion
this._presentacionService.getPresentaciones().subscribe((result) => {
  this.presentacion = result;
})
//Lugar del Luga del evento 
this._lugarDelEventoService.getLugarDelEvento().subscribe((result) => {
  this.lugarDelEvento=result;
})
    //Galeria del lugar
    this._galeriaLugarService.getGaleria().subscribe((result) => {
      this.galeriaLugar = result;
    });
    //Galeria informativa
    this._galeriaInformacionService.getGaleria().subscribe((result) => {
      this.galeriaInformacion = result;
    });
    
  }

  getComite() {
    this._comiteService.getComite().subscribe((result) => {
      this.comiteOrganizador = result.filter(
        (comite) => comite.tipo == "COMITÉ ORGANIZADOR"
      );
      this.comiteCientifico = result.filter(
        (comite) => comite.tipo != "COMITÉ ORGANIZADOR"
      );
    });
  }
  getEdiciones() {
    this._edicionService.getEdiciones().subscribe((result) => {
      this.ediciones = result;
    });
  }
  getInvestigadores() {
    this._investigadoresService.getInvestigadores().subscribe((result) => {
      this.investigadores = result;
    });
  }
  abrirPDF(URL) {
    if (URL != null  && URL!= '') {
      window.open(this.URL + URL, "_blank");
    }
  }
  abrirEnlace(URL){
    if (URL != null  && URL!= '') {
      window.open(URL, "_blank");
    }
  }
}
