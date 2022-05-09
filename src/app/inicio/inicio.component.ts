import { Component, OnInit } from "@angular/core";
import { Comite } from "../models/comite.model";
import { Edicion } from "../models/edicion.model";
import { EnvioTrabajos } from "../models/envioTrabajos.model";
import { EnvioTrabajosFechas } from "../models/envioTrabajosFechas.model";
import { EnvioTrabajosFormato } from "../models/envioTrabajosFormatos.model";
import { Galeria } from "../models/galeria";
import { InformacionTuristica } from "../models/informacionTuristica.model";
import { Investigador } from "../models/investigador.model";
import { LugarDelEvento } from "../models/lugarDelEvento.model";
import { Presentacion } from "../models/presentacion.model";
import { Programa } from "../models/programa.model";
import { ComiteService } from "../services/comite.service";
import { EdicionService } from "../services/edicion.service";
import { EnvioTrabajosFechasService } from "../services/envio-trabajos-fechas.service";
import { EnvioTrabajosFormatosService } from "../services/envio-trabajos-formatos.service";
import { EnvioTrabajosService } from "../services/envio-trabajos.service";
import { GaleriaInformacionService } from "../services/galeria-informacion.service";
import { GaleriaLugarService } from "../services/galeria-lugar.service";
import { InformacionTuristicaService } from "../services/informacion-turistica.service";
import { InvestigadoresService } from "../services/investigadores.service";
import { LugarDelEventoService } from "../services/lugar-del-evento.service";
import { PresentacionService } from "../services/presentacion.service";
import { ProgramaService } from "../services/programa.service";

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
  informacionTuristica:InformacionTuristica[] = [];
  programa: Programa[] = [];
  envioTrabajos:EnvioTrabajos[] = [];
  envioTrabajosFechas:EnvioTrabajosFechas[] = [];
  envioTrabajosFormatos: EnvioTrabajosFormato[] = [];
  URL = "http://localhost:3000/";
  constructor(
    private _comiteService: ComiteService,
    private _edicionService: EdicionService,
    private _investigadoresService: InvestigadoresService,
    private _galeriaLugarService: GaleriaLugarService,
    private _galeriaInformacionService: GaleriaInformacionService,
    private _presentacionService: PresentacionService,
    private _lugarDelEventoService: LugarDelEventoService,
    private _informacionTuristicaService: InformacionTuristicaService,
    private _programaService: ProgramaService,
    private _envioTrabajosService: EnvioTrabajosService,
    private _envioTrabajosFechasService: EnvioTrabajosFechasService,
    private _envioTrabajosFormatosService: EnvioTrabajosFormatosService
  ) {}

  ngOnInit(): void {
    this.getComite();
    this.getEdiciones();
    this.getInvestigadores();
    this.getSobreElEvento();
    this.getInformacionTuristica();
    this.getPrograma();
    this.getEnvioTrabajos();
    this.getEnvioTrabajosFechas();
    this.getEnvioTrabajosFormatos();
  }
  getEnvioTrabajosFormatos() {
    this._envioTrabajosFormatosService.getEnvioTrabajoFormatos().subscribe((result)=>{
      this.envioTrabajosFormatos= result;
    })
  }
  getEnvioTrabajosFechas() {
    this._envioTrabajosFechasService.getEnvioTrabajoFechas().subscribe((result) => {
      this.envioTrabajosFechas= result;
    })
  }
  getEnvioTrabajos() {
   this._envioTrabajosService.getEnvioTrabajos().subscribe((result)=>{
     this.envioTrabajos= result;
   })
  }
  getPrograma() {
   this._programaService.getProgramas().subscribe((result)=>{

    this.programa= result;
   })
  }
  getInformacionTuristica() {
  this._informacionTuristicaService.getInformacionTuristicas().subscribe((result) => {
this.informacionTuristica=result;
  })
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
