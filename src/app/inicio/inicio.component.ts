import { ThisReceiver } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { NgbAccordionConfig } from "@ng-bootstrap/ng-bootstrap";
import { Comite } from "../models/comite.model";
import { Edicion } from "../models/edicion.model";
import { EnvioTrabajos } from "../models/envioTrabajos.model";
import { EnvioTrabajosFechas } from "../models/envioTrabajosFechas.model";
import { EnvioTrabajosFormato } from "../models/envioTrabajosFormatos.model";
import { Galeria } from "../models/galeria";
import { InformacionTuristica } from "../models/informacionTuristica.model";
import { Inicio } from "../models/inicio.model";
import { InicioGaleria } from "../models/inicioGaleria.model";
import { Investigador } from "../models/investigador.model";
import { LugarDelEvento } from "../models/lugarDelEvento.model";
import { Presentacion } from "../models/presentacion.model";
import { Programa } from "../models/programa.model";
import { ProgramaDetalle } from "../models/programaDetalle.model";
import { ProgramaDias } from "../models/programaDias.model";
import { ProgramaJornada } from "../models/programaJornada.model";
import { Temario } from "../models/temario.model";
import { TemarioTemas } from "../models/temarioTemas.model";
import { ComiteService } from "../services/comite.service";
import { EdicionService } from "../services/edicion.service";
import { EnvioTrabajosFechasService } from "../services/envio-trabajos-fechas.service";
import { EnvioTrabajosFormatosService } from "../services/envio-trabajos-formatos.service";
import { EnvioTrabajosService } from "../services/envio-trabajos.service";
import { GaleriaInformacionService } from "../services/galeria-informacion.service";
import { GaleriaLugarService } from "../services/galeria-lugar.service";
import { InformacionTuristicaService } from "../services/informacion-turistica.service";
import { InicioGaleriaService } from "../services/inicio-galeria.service";
import { InicioService } from "../services/inicio.service";
import { InvestigadoresService } from "../services/investigadores.service";
import { LugarDelEventoService } from "../services/lugar-del-evento.service";
import { PresentacionService } from "../services/presentacion.service";
import { ProgramaDetalleService } from "../services/programa-detalle.service";
import { ProgramaDiasService } from "../services/programa-dias.service";
import { ProgramaJornadaService } from "../services/programa-jornada.service";
import { ProgramaService } from "../services/programa.service";
import { TemarioTemasService } from "../services/temario-temas.service";
import { TemarioService } from "../services/temario.service";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { environment } from "../../environments/environment";
import Swal from "sweetalert2";
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
  presentacion: Presentacion[] = [];
  lugarDelEvento: LugarDelEvento[] = [];
  informacionTuristica: InformacionTuristica[] = [];
  programa: Programa[] = [];
  envioTrabajos: EnvioTrabajos[] = [];
  envioTrabajosFechas: EnvioTrabajosFechas[] = [];
  envioTrabajosFormatos: EnvioTrabajosFormato[] = [];
  temarios: Temario[] = [];
  temarioTemas: TemarioTemas[] = [];
  inicio: Inicio[] = [];
  inicioGaleria: InicioGaleria[] = [];
  programaJornada: ProgramaJornada[] = [];
  programaDias: ProgramaDias[] = [];
  DiasMatutina: ProgramaDias[] = [];
  DiasVespertina: ProgramaDias[] = [];
  programaDetalle: ProgramaDetalle[] = [];
  nombreContacto: string = "";
  telefonoContacto: string = "";
  correoContacto: string = "";
  mensajeContacto: string = "";
  URL :  string = environment.api+"/";
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
    private _envioTrabajosFormatosService: EnvioTrabajosFormatosService,
    private _temarioService: TemarioService,
    private _temarioTemasServices: TemarioTemasService,
    private _inicioService: InicioService,
    private _inicioGaleriaService: InicioGaleriaService,
    private _programaJornadaService: ProgramaJornadaService,
    private _programaDiasService: ProgramaDiasService,
    private _programaDetalleService: ProgramaDetalleService,
    config: NgbAccordionConfig
  ) {
    config.closeOthers = true;
    config.type = "info";
  }

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
    this.getTemarios();
    this.getTemarioTemas();
    this.getInicio();
    this.getInicioGaleria();
    this.getProgramaJornada();
    this.getProgramaDias();
    this.getProgramaDetalle();
  }
  getProgramaDetalle() {
    this._programaDetalleService.getProgramaDetalle().subscribe((result) => {
      this.programaDetalle = result;
    });
  }
  getProgramaDias() {
    this._programaDiasService.getProgramaDias().subscribe((result) => {
      this.programaDias = result;
      result.forEach((dia) => {
        dia.jornada_per === 1
          ? this.DiasMatutina.push(dia)
          : this.DiasVespertina.push(dia);
      });
    });
  }
  getProgramaJornada() {
    this._programaJornadaService.getProgramaJornada().subscribe((result) => {
      this.programaJornada = result;
      console.log("Detalle", result);
    });
  }
  getInicioGaleria() {
    this._inicioGaleriaService.getInicioGaleria().subscribe((result) => {
      this.inicioGaleria = result;
    });
  }
  getInicio() {
    this._inicioService.getInicio().subscribe((result) => {
      this.inicio = result;
      console.log(result);
    });
  }
  getTemarioTemas() {
    this._temarioTemasServices.getTemarioTemas().subscribe((result) => {
      this.temarioTemas = result;
    });
  }
  getTemarios() {
    this._temarioService.getTemarios().subscribe((result) => {
      this.temarios = result;
    });
  }
  getEnvioTrabajosFormatos() {
    this._envioTrabajosFormatosService
      .getEnvioTrabajoFormatos()
      .subscribe((result) => {
        this.envioTrabajosFormatos = result;
      });
  }
  getEnvioTrabajosFechas() {
    this._envioTrabajosFechasService
      .getEnvioTrabajoFechas()
      .subscribe((result) => {
        this.envioTrabajosFechas = result;
      });
  }
  getEnvioTrabajos() {
    this._envioTrabajosService.getEnvioTrabajos().subscribe((result) => {
      this.envioTrabajos = result;
    });
  }
  getPrograma() {
    this._programaService.getProgramas().subscribe((result) => {
      this.programa = result;
    });
  }
  getInformacionTuristica() {
    this._informacionTuristicaService
      .getInformacionTuristicas()
      .subscribe((result) => {
        this.informacionTuristica = result;
      });
  }
  getSobreElEvento() {
    //Presentacion
    this._presentacionService.getPresentaciones().subscribe((result) => {
      this.presentacion = result;
    });
    //Lugar del Luga del evento
    this._lugarDelEventoService.getLugarDelEvento().subscribe((result) => {
      this.lugarDelEvento = result;
    });
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
    if (URL != null && URL != "") {
      window.open(this.URL + URL, "_blank");
    }
  }
  abrirEnlace(URL) {
    if (URL != null && URL != "") {
      window.open(URL, "_blank");
    }
  }
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_tog3xds",
        "template_7jqkydj",
        e.target as HTMLFormElement,
        "yeeju8ULL7flDQq3x"
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
          this.resetContacto();
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  resetContacto() {
    this.nombreContacto = "";
    this.telefonoContacto = "";
    this.correoContacto = "";
    this.mensajeContacto = "";
    this.confirmacionEmail();
  }
  confirmacionEmail() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Correo enviado',
      text:'Pronto nos pondremos en contacto contigo',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
