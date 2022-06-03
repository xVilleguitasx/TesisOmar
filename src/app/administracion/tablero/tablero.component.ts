import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
} from "@angular/core";
import { InscripcionService } from "../../../app/services/inscripcion.service";
import { Inscripcion } from "../../../app/models/inscripcion.model";
import { Carrera } from "../../../app/models/carrera.model";
import { Semestre } from "../../../app/models/semestre.model";
import { Paralelo } from "../../../app/models/paralelo.model";
import { Pago } from "../../../app/models/pago.model";
import { TipoInscripcion } from "../../../app/models/tipoInscripcion.model";
import { CarrerasService } from "../../../app/services/carreras.service";
import { SemestreService } from "../../../app/services/semestre.service";
import { ParaleloService } from "../../../app/services/paralelo.service";
import { PagoService } from "../../../app/services/pago.service";
import { TipoInscripcionService } from "../../../app/services/tipo-inscripcion.service";
import { AdminInscripService } from "../../../app/services/admin-inscrip.service";
import { AdminsInscrip } from "../../../app/models/adminInscrip.model";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import $ from "jquery";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

import Swal from "sweetalert2";
import { ConfiguracionService } from "../../../app/services/configuracion.service";
import { Config } from "../../../app/models/config.model";
import { PatrocinadoresService } from "../../../app/services/patrocinadores.service";
import { Patrocinador } from "../../../app/models/patrocinador.model";
import { InfoRegistroService } from "../../../app/services/info-registro.service";
import { InfoRegistro } from "../../../app/models/infoRegistro.model";
import { EdicionService } from "../../../app/services/edicion.service";
import { TipoPaperService } from "../../../app/services/tipo-paper.service";
import { Paper } from "../../../app/models/paper.model";
import { Idioma } from "../../../app/models/idioma.model";
import { IdiomaService } from "../../../app/services/idioma.service";
import { Comite } from "../../../app/models/comite.model";
import { ComiteService } from "../../../app/services/comite.service";
import { TipoComite } from "../../../app/models/tipoComite.model";
import { TipoComiteService } from "../../../app/services/tipo-comite.service";
import { PersonasService } from "../../../app/services/personas.service";
import { Edicion } from "../../../app/models/edicion.model";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Investigador } from "../../../app/models/investigador.model";
import { InvestigadoresService } from "../../../app/services/investigadores.service";

import { InformacionCongresoService } from "../../../app/services/informacion-congreso.service";
import { InformacionCongreso } from "../../../app/models/informacionCongreso.model";
import { ImagenPortadaService } from "../../../app/services/imagen-portada.service";
import { ImagenesPortada } from "../../../app/models/imagenesPortada.model";
import { ConfiReportesService } from "../../../app/services/confi-reportes.service";
import { confiReportes } from "../../../app/models/confiReportes.model";
import { ConfiCertificados } from "../../../app/models/confiCertificados.model";
import { ConfiCertificadosService } from "../../../app/services/confi-certificados.service";
import { AuthService } from "../../../app/services/auth.service";
import { Router } from "@angular/router";
import { Galeria } from "../../../app/models/galeria";
import { GaleriaLugarService } from "../../../app/services/galeria-lugar.service";
import { GaleriaInformacionService } from "../../../app/services/galeria-informacion.service";
import { Presentacion } from "../../../app/models/presentacion.model";
import { PresentacionService } from "../../../app/services/presentacion.service";
import { LugarDelEvento } from "../../../app/models/lugarDelEvento.model";
import { LugarDelEventoService } from "../../../app/services/lugar-del-evento.service";
import { InformacionTuristica } from "../../../app/models/informacionTuristica.model";
import { InformacionTuristicaService } from "../../../app/services/informacion-turistica.service";
import { Programa } from "../../../app/models/programa.model";
import { EnvioTrabajos } from "../../../app/models/envioTrabajos.model";
import { EnvioTrabajosFormato } from "../../../app/models/envioTrabajosFormatos.model";
import { EnvioTrabajosFechas } from "../../../app/models/envioTrabajosFechas.model";
import { Temario } from "../../../app/models/temario.model";
import { TemarioTemas } from "../../../app/models/temarioTemas.model";
import { ProgramaService } from "../../../app/services/programa.service";
import { EnvioTrabajosService } from "../../../app/services/envio-trabajos.service";
import { EnvioTrabajosFechasService } from "../../../app/services/envio-trabajos-fechas.service";
import { EnvioTrabajosFormatosService } from "../../../app/services/envio-trabajos-formatos.service";
import { TemarioService } from "../../../app/services/temario.service";
import { TemarioTemasService } from "../../../app/services/temario-temas.service";
import { Inicio } from "../../../app/models/inicio.model";
import { InicioGaleria } from "../../../app/models/inicioGaleria.model";
import { ProgramaJornada } from "../../../app/models/programaJornada.model";
import { ProgramaDias } from "../../../app/models/programaDias.model";
import { ProgramaDetalle } from "../../../app/models/programaDetalle.model";
import { InicioService } from "../../../app/services/inicio.service";
import { InicioGaleriaService } from "../../../app/services/inicio-galeria.service";
import { ProgramaJornadaService } from "../../../app/services/programa-jornada.service";
import { ProgramaDiasService } from "../../../app/services/programa-dias.service";
import { ProgramaDetalleService } from "../../../app/services/programa-detalle.service";

@Component({
  selector: "app-tablero",
  templateUrl: "./tablero.component.html",
  styleUrls: ["./tablero.component.css"],
})
export class TableroComponent implements OnInit {
  URL = "http://localhost:3000/";
  idPatrocinador: number = null;
  idInfoRegistro: number = null;
  documento = null;
  id_per_pert = null;
  file = null;
  facturasPorLotes: File[] = [];
  patrocinadores: Patrocinador[] = [];
  tipoPaper: Paper[] = [];
  inscripcionAcual: AdminsInscrip;
  inscripcionesValidadas: AdminsInscrip[];
  inscripciones: AdminsInscrip[] = [];
  inscripcionesFiltradas: AdminsInscrip[] = [];
  pageSizeComite = 10;
  pageComite = 1;
  closeResult = "";
  multiFiltro = "";
  modalRef: NgbModalRef;
  estadoInfoRegistro: boolean = true;
  textoInputInfoRegistro: string = "";
  tipoComite: TipoComite[] = [];
  tipoComiteLista: string[] = ["Tipo Comite"];
  tipoComiteMostrar = "Tipo Comite";
  validarComite: boolean = true;
  ////
  tituloReporte = "";
  informacionCongreso: InformacionCongreso[] = [];
  //ImagenesPortada
  imagenesPortada: ImagenesPortada[] = [];
  idImgPortada = null;
  imagenPortada: string = "";
  linkImgPortada = "";
  estadoImgPortada = true;
  error = false;
  totalFiltro: number = 0;
  ////////////
  confiCertificados: ConfiCertificados[] = [];
  ////////////////////////////////
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _inscripcionService: InscripcionService,
    private _carreraService: CarrerasService,
    private _semestreService: SemestreService,
    private _paraleloService: ParaleloService,
    private _pagoService: PagoService,
    private _tipoInscripcionService: TipoInscripcionService,
    private _adminInscripService: AdminInscripService,
    private _modalService: NgbModal,
    private _configService: ConfiguracionService,
    private _patrocinadoresService: PatrocinadoresService,
    private _infoRegistroService: InfoRegistroService,
    private _edicionService: EdicionService,
    private _tipoPaperService: TipoPaperService,
    private _idiomaService: IdiomaService,
    private _comiteService: ComiteService,
    private _tipoComiteService: TipoComiteService,
    private _cdRef: ChangeDetectorRef,
    private _personaService: PersonasService,
    private _investigadoresService: InvestigadoresService,
    private _informacionCongresoService: InformacionCongresoService,
    private _imagenesPortada: ImagenPortadaService,
    private _confi_certificados: ConfiCertificadosService,
    private _galeriaLugarService: GaleriaLugarService,
    private _galeriaInformacionService: GaleriaInformacionService,
    private _presentacionService: PresentacionService,
    private _lugarDelEventoService: LugarDelEventoService,
    private _informacionTuristica: InformacionTuristicaService,
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
    private _programaDetalleService: ProgramaDetalleService
  ) {}
  registros: string[] = [
    "Seleccione...",
    "Todos los registros",
    "Registros no validados",
    "Registros Validados",
  ];
  comprobantes: string[] = [
    "Seleccione...",
    "Comprobantes subidos",
    "Sin comprobante",
  ];
  tipoComprobante = "Seleccione...";
  textoPdf = "";
  tipoRegistro: string = this.registros[0];
  carreras: Carrera[] = [];
  tipoCarrera: string = "Seleccione...";
  semestres: Semestre[] = [];
  tipoSemestre: string = "Seleccione...";
  paralelos: Paralelo[] = [];
  tipoParalelo: string = "Seleccione...";
  pagos: Pago[] = [];
  tipoPago: string = "Seleccione...";
  inscripcion: TipoInscripcion[] = [];
  tipoInscripcion: string = "Seleccione...";
  active = 1;
  active2 = 1;
  page = 1;
  pageSize = 10;
  idSemestre;
  idparalelo;
  idCarrera;
  nombrePatrocinador: string = "";
  estadoPatrocinador: boolean = true;
  linkPatrocinador: string = "";
  textoInPutPatrocinador: string = "";
  nombreTipoInscripcion: string = "";
  estadoTipoInscripcion: boolean = true;
  precioTipoInscripcion: string = "";
  idTipoInscripcion: string = null;
  /* Datos de combo */
  tipoEstudiante = false;
  configuraciones: Config[] = [];
  infoRegistros: InfoRegistro[] = [];
  //Ediciones
  idEdicion = null;
  tituloEdicion: string = "";
  file2: File = undefined;
  lugarEdicion: string = "";
  modalidadEdicion: string = "";
  horasEdicion: string = "";
  fechaEdicion: string = "";
  telefonoEdicion: string = "";
  correoEdicion: string = "";
  webEdicion: string = "";
  anioEdicion: string = "";
  estadoEdicion: boolean = false;
  idPaper = null;
  nombrePaper: string = "";
  estadoPaper: boolean = true;
  idiomas: Idioma[] = [];
  nombreIdioma: string = "";
  estadoIdioma: boolean = true;
  idIdioma = null;
  nombreCarrera: string = "";
  estadoCarrera: boolean = true;
  idCarreraActual = null;
  //Comite
  comite: Comite[] = [];
  comiteFiltrado: Comite[] = [];
  ediciones: string[] = ["Ediciones", "2021", "2022", "2023"];
  edicionMostrar: string = "Ediciones";
  TipoComite: string = "Seleccione...";
  idTipoComite: number = null;
  nombreComte: string = "";
  CargoComite: string = "";
  InstitutoComite: string = "";
  PaisComite: string = "";
  EdicionComite: string = "";
  idComite = null;
  //InscripcionVariables
  erorInscripcion: boolean = false;
  DIinsctipcion: string = "";
  nombresInscripcion: string = "";
  apellidosInscripcion: string = "";
  tipoInscrpcion: string = "";
  tipoInscripcionID: number = null;
  numeroDepositoInscripcion: string = "";
  correoInscripcion: string = "";
  celularInscripcion: string = "";
  direccionInscripcion: string = "";
  estadoInscripcion: boolean;
  idPersonaInscripcion: number = null;
  idInscripcionActual: number = null;
  textoImputImgEdicion = "";
  textoImputPdfEdicion = "";
  //Inscripcion
  listadoEdiciones: Edicion[] = [];
  ////////////////////////////////////////////////////////////////
  //Investigadores
  investigadores: Investigador[] = [];
  idInvestigador = null;
  nombreInvestigador = "";
  paisInvestigador = "";
  fotoInvestigador = "";
  hojaDeVidaInvestigador = "";
  Edicion = "";
  institucionInvestigador = "";
  //Información Congreso
  idCongreso = null;
  nombreCongreso = "";
  tituloCongreso = "";
  fechaCongreso = "";
  logoCongreso = "";
  faviconCongreso = "";
  ////////////////////////////////////////////////////////////////

  fechaCreacionReporte = null;
  //Datos Reportes
  inscritosValidados: number = 0;
  totalEstudiantes: number = 0;
  totalProfesionales: number = 0;
  totalAutores: number = 0;
  totalestudiantesValidados: number = 0;
  totalProfesionalesValidados: number = 0;
  totalAutoresValidados: number = 0;
  ////////////////////////////////
  totalRecaudacion: number = 0;
  totalRecaudacionAutores: number = 0;
  totalRecaudacionProfesionales: number = 0;
  totalRecaudacionEstudiantes: number = 0;
  ////////////////////////////////
  pagoEfectivo: number = 0;
  pagoTarjeta: number = 0;
  ////////////
  idConfiRepo: string = "";
  encambezadoConfiRepo: string = "";
  tituloConfiRepo: string = "";
  logoConfiRepo: string = "";
  bannerConfiRepo: string = "";
  ////
  idConfiCertificado: string = "";
  nombreCertificado: string = "";
  plantillaCertificado: string = "";
  plantillaTipo: string = "1";
  galeriaLugar: Galeria[] = [];
  gleririaInformacion: Galeria[] = [];
  ////////////////////////////////
  nombreGaleria = "";
  imagenGaleria = "";
  galeriaSeleccionada: Galeria = undefined;
  //
  presentacion: Presentacion[] = [];
  //
  lugarDelEvento: LugarDelEvento[] = [];
  //
  textoPresentacion = "";
  imagen_boton_1 = "";
  link_boton_1 = "";
  link_boton_2 = "";
  imagen_boton_2 = "";
  textoInformacionTuristica = "";
  informacionTuristica: InformacionTuristica[] = [];
  informacionTuristicaSeleccionada: InformacionTuristica = undefined;
  ////
  programa: Programa[] = [];
  envioTrabajos: EnvioTrabajos[] = [];
  envioTrabajosFormatos: EnvioTrabajosFormato[] = [];
  envioTrabajosFechas: EnvioTrabajosFechas[] = [];
  temarios: Temario[] = [];
  temarioTemas: TemarioTemas[] = [];
  //
  programaSeleccionaado: Programa = undefined;
  descripcionPrograma = "";
  botonPrograma = "";
  linkPrograma = "";
  imagenPrograma = "";
  programaPrograma = "";
  ///

  textoEnvioTrabajos: string = "";
  botonEnvioTrabajos: string = "";
  linkEnvioTrabajos: string = "";
  envioTrabajoSeleccionado: EnvioTrabajos = undefined;
  inicio: Inicio[] = [];
  inicioGaleria: InicioGaleria[] = [];
  programaJornada: ProgramaJornada[] = [];
  programaDias: ProgramaDias[] = [];
  DiasMatutina: ProgramaDias[] = [];
  DiasVespertina: ProgramaDias[] = [];
  programaDetalle: ProgramaDetalle[] = [];
  inicioSeleccionado: Inicio = undefined;
  resetVariables() {
    this.documento = null;
    this.file = null;
    this.textoPdf = "";
    this.inscripcionAcual = null;
  }
  obtenerConfiguracion() {
    this._configService.getConf().subscribe((result) => {
      this.configuraciones = result;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.getInscripciones();
    this.inscripcionesFiltradas = this.inscripciones;
    this.CargarDatosCombos();
    this.obtenerConfiguracion();
    this.getPatrocinadores();
    this.getInfoRegistro();
    this.getTipoPaper();
    this.getIdiomas();
    this.getComite();
    this.getTipoComite();
    this.getEdiciones();
    this.getInvestigadores();
    this.getInformacionCongreso();
    this.getImagenesPortada();
    this.getConfiCertificados();
    this.getGaleriaLugar();
    this.getGaleriaInformacion();
    this.getPresentacion();
    this.getLugarDelEvento();
    this.getInformacionTuristica();
    this.getPrograma();
    this.getEnvioTrabajos();
    this.getEnvioTrabajosFormatos();
    this.getEnvioTrabajosFechas();
    this.getTemarios();
    this.getTemariosTemas();
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
    this.DiasMatutina=[];
    this.DiasVespertina=[];
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
    });
  }
  getEnvioTrabajosFechas() {
    this._envioTrabajosFechasService
      .getEnvioTrabajoFechas()
      .subscribe((result) => {
        this.envioTrabajosFechas = result;
      });
  }
  getTemariosTemas() {
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
    this._informacionTuristica
      .getInformacionTuristicas()
      .subscribe((result) => {
        this.informacionTuristica = result;
      });
  }
  getLugarDelEvento() {
    this._lugarDelEventoService.getLugarDelEvento().subscribe((result) => {
      this.lugarDelEvento = result;
    });
  }
  getPresentacion() {
    this._presentacionService.getPresentaciones().subscribe((result) => {
      this.presentacion = result;
    });
  }
  getGaleriaInformacion() {
    this._galeriaInformacionService.getGaleria().subscribe((result) => {
      this.gleririaInformacion = result;
    });
  }

  getGaleriaLugar() {
    this._galeriaLugarService.getGaleria().subscribe((result) => {
      this.galeriaLugar = result;
    });
  }
  getConfiCertificados() {
    /*   this._confi_certificados.getConfiCertificados().subscribe((result) => {
      this.confiCertificados = result;
    }); */
  }

  getImagenesPortada() {
    this._imagenesPortada.getImagenesPortada().subscribe((result) => {
      this.imagenesPortada = result;
    });
  }
  getInformacionCongreso() {
    this._informacionCongresoService.getInfoAll().subscribe((result) => {
      this.informacionCongreso = result;
    });
  }
  getInvestigadores() {
    this._investigadoresService.getInvestigadores().subscribe((result) => {
      this.investigadores = result;
    });
  }
  getEdiciones() {
    this._edicionService.getEdiciones().subscribe((result) => {
      this.listadoEdiciones = result;
    });
  }
  getTipoComite() {
    this._tipoComiteService.getTipoComite().subscribe((result) => {
      this.tipoComite = result;
      this.tipoComite.forEach((tipoComite) => {
        this.tipoComiteLista[this.tipoComiteLista.length] = tipoComite.tipo;
      });
    });
  }
  getComite() {
    this._comiteService.getComite().subscribe((result) => {
      this.comite = result;
      this.comiteFiltrado = result;
    });
  }
  getIdiomas() {
    this._idiomaService.getIdiomas().subscribe((result) => {
      this.idiomas = result;
    });
  }
  getTipoPaper() {
    this._tipoPaperService.getPapers().subscribe((result) => {
      this.tipoPaper = result;
    });
  }
  getInfoRegistro() {
    this._infoRegistroService.getInfoRegistros().subscribe((result) => {
      this.infoRegistros = result;
    });
  }
  getPatrocinadores() {
    this._patrocinadoresService.getPatrocinadores().subscribe((result) => {
      this.patrocinadores = result;
    });
  }
  getInscripciones() {
    this._adminInscripService
      .getInscripciones()
      .subscribe(
        (result) => (
          (this.inscripcionesFiltradas = result),
          (this.inscripciones = result),
          (this.inscripcionesValidadas = result.filter(
            (element) => element.estado === "V"
          ))
        )
      );
  }
  cambiarConfiguracion(conf: Config) {
    conf.estado = !conf.estado;
    this._configService.editConf(conf).subscribe((result) => {});
  }
  CambiarRegistro(val: string) {
    this.tipoRegistro = val;
    this.busquedaGlobal();
  }
  //TODO: Los registros DV no estan tomados en cuenta en este filtro
  filtroRegistro() {
    if (this.tipoRegistro === "Registros no validados") {
      this.inscripcionesFiltradas = this.inscripciones.filter(
        (element) => element.estado === "NV"
      );
    } else if (this.tipoRegistro === "Registros Validados") {
      this.inscripcionesFiltradas = this.inscripciones.filter(
        (element) => element.estado === "V"
      );
    } else {
      this.inscripcionesFiltradas = this.inscripciones;
    }
  }
  filtroComprobante() {
    if (this.tipoComprobante === "Comprobantes subidos") {
      this.inscripcionesFiltradas = this.inscripcionesFiltradas.filter(
        (element) => element.comprobante != null
      );
    }
    if (this.tipoComprobante === "Sin comprobante") {
      this.inscripcionesFiltradas = this.inscripcionesFiltradas.filter(
        (element) => element.comprobante === null
      );
    }
  }
  filtroInscripcion() {
    this.inscripcionesFiltradas = this.inscripcionesFiltradas.filter(
      (element) => element.tipo_Inscrito === this.tipoInscripcion
    );
  }
  filtroPago() {
    this.inscripcionesFiltradas = this.inscripcionesFiltradas.filter(
      (element) => element.tipo_Pago === this.tipoPago
    );
  }
  filtroCarrera() {
    this.filtroInscripcion();
    this.inscripcionesFiltradas = this.inscripcionesFiltradas.filter(
      (element) => element.id_carrera_per === this.idCarrera
    );
  }
  filtroSemestre() {
    this.inscripcionesFiltradas = this.inscripcionesFiltradas.filter(
      (element) => element.id_semestre_per === this.idSemestre
    );
  }
  filtroParalelo() {
    this.inscripcionesFiltradas = this.inscripcionesFiltradas.filter(
      (element) => element.id_paralelo_per === this.idparalelo
    );
  }
  CargarDatosCombos() {
    this.CargarCarreras();
    this.CargarSemestres();
    this.CargarParalelos();
    this.CargarTipoInscripcion();
    this.CargarPagos();
  }
  async CargarPagos() {
    await this._pagoService.getPagos().subscribe((result) => {
      this.pagos = result;
    });
  }
  async CargarTipoInscripcion() {
    await this._tipoInscripcionService
      .getTipoInscripciones()
      .subscribe((result) => {
        this.inscripcion = result;
      });
  }
  async CargarParalelos() {
    await this._paraleloService.getParalelos().subscribe((result) => {
      this.paralelos = result;
    });
  }
  async CargarSemestres() {
    await this._semestreService.getSemestres().subscribe((result) => {
      this.semestres = result;
    });
  }
  async CargarCarreras() {
    await this._carreraService.getCarreras().subscribe((result) => {
      this.carreras = result;
    });
  }
  CambiarParalelo(val: Paralelo): void {
    this.tipoParalelo = val.nombre;
    this.idparalelo = val.id;
    this.busquedaGlobal();
  }
  CambiarComprobante(val: string) {
    this.tipoComprobante = val;
    this.busquedaGlobal();
  }
  CambiarSemestre(val: Semestre): void {
    this.tipoSemestre = val.semestre;
    this.idSemestre = val.id;
    this.busquedaGlobal();
  }
  CambiarCarrera(val: Carrera): void {
    this.tipoCarrera = val.carrera;
    this.idCarrera = val.id;
    this.busquedaGlobal();
  }
  CambiarInscripcion(val: TipoInscripcion) {
    this.tipoInscripcion = val.nom_inscr;
    if (this.tipoInscripcion === "STUDENT") {
      this.tipoEstudiante = true;
    } else {
      this.tipoEstudiante = false;
      this.idCarrera = null;
      this.idSemestre = null;
      this.idparalelo = null;
      this.tipoCarrera = "Seleccione...";
      this.tipoSemestre = "Seleccione...";
      this.tipoParalelo = "Seleccione...";
    }
    this.busquedaGlobal();
  }
  CambiarPago(val: Pago) {
    this.tipoPago = val.tipo;
    this.busquedaGlobal();
  }
  cambiarEstado(incrip: AdminsInscrip) {
    const fecha = new Date();
    if (incrip.estado === "NV") {
      const estado = {
        estado: "V",
        fecha_validacion_deposito: fecha,
        Hora_Validacion_Deposito:
          fecha.getHours() +
          ":" +
          fecha.getMinutes() +
          ":" +
          fecha.getSeconds(),
      };
      this._adminInscripService
        .update(incrip.numero.toString(), estado)
        .subscribe();
    } else if (incrip.estado === "DV") {
      const estado = {
        estado: "V",
        fecha_validacion_deposito: fecha,
        Hora_Validacion_Deposito:
          fecha.getHours() +
          ":" +
          fecha.getMinutes() +
          ":" +
          fecha.getSeconds(),
      };
      this._adminInscripService
        .update(incrip.numero.toString(), estado)
        .subscribe();
    } else if (incrip.estado === "V") {
      const estado = {
        estado: "NV",
        fecha_validacion_deposito: fecha,
        Hora_Validacion_Deposito:
          fecha.getHours() +
          ":" +
          fecha.getMinutes() +
          ":" +
          fecha.getSeconds(),
      };
      this._adminInscripService
        .update(incrip.numero.toString(), estado)
        .subscribe();
    }
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    if (this.file.name !== null && this.file.name != "") {
      this.textoPdf = this.file.name;
    } else {
      this.textoPdf = "";
      this.file = null;
    }
  }

  guardarPdf() {
    var data = new FormData();
    data.append("factura", this.file);

    this._inscripcionService
      .updateFactura(this.id_per_pert, data)
      .subscribe((result) => {
        (this.id_per_pert = null),
          this.Mensaje(
            "Factura actualziada",
            "Los datos se actualizaron exitosamente!"
          ),
          this.getInscripciones();
        this.cerrarModal();
      });
  }
  Mensaje(titulo: string, texto: string) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#7A1E19",
      iconColor: "#7A1E19",
      color: "#7A1E19",
    });
  }
  openFactura(inscripcion: AdminsInscrip, content) {
    this.inscripcionAcual = inscripcion;
    this.id_per_pert = inscripcion.id_per_pert;
    if (this.inscripcionAcual.factura != "") {
      this.linkUrl(inscripcion.factura);
    }
    this.modalRef = this._modalService.open(content, { size: "xl" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariables();
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.resetVariables();
      }
    );
  }
  openFacturasLote(content) {
    this._modalService.open(content, { size: "lg" }).result.then(
      (result) => {
        this.resetVariables();
      },
      (reason) => {
        this.resetVariables();
      }
    );
  }
  openPatrocinadores(content) {
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesPatrocinadores();
        this.getPatrocinadores();
      },
      (reason) => {
        this.resetVariablesPatrocinadores();
      }
    );
  }
  resetVariablesPatrocinadores() {
    this.idPatrocinador = null;
    this.file = null;
    this.textoInPutPatrocinador = "";
    this.nombrePatrocinador = "";
    this.linkPatrocinador = "";
    this.estadoPatrocinador = true;
    this.idPatrocinador = null;
  }
  openInfoRegistro(content) {
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesRegistro();
      },
      (reason) => {
        this.resetVariablesRegistro();
      }
    );
  }
  resetVariablesRegistro() {
    this.file = null;
    this.idInfoRegistro = null;
    this.estadoInfoRegistro = true;
  }
  cerrarModal() {
    this.modalRef.close();
  }
  openComprobante(inscripcion: AdminsInscrip, content) {
    this.inscripcionAcual = inscripcion;

    this.linkUrl(inscripcion.comprobante);
    this._modalService.open(content, { centered: true }).result.then(
      () => {
        this.resetVariables();
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  linkUrl(urlImage) {
    const link = this.URL + urlImage;
    this.documento = link;
  }
  eliminarFactura() {
    const factura = {
      factura: null,
    };
    this._inscripcionService
      .editInscripcion(this.inscripcionAcual.id_per_pert.toString(), factura)
      .subscribe((result) => {
        this.getInscripciones();
      });
    this.documento = null;
  }

  onFolderSelected(event) {
    this.facturasPorLotes = event.target.files;
  }
  subirPdfPorLotes() {
    for (let factura of this.facturasPorLotes) {
      for (let inscripcion of this.inscripciones) {
        if (factura.name.split(".").slice(0, -1).join(".") === inscripcion.di) {
          var data = new FormData();
          data.append("factura", factura);
          this._inscripcionService
            .updateFactura(inscripcion.id_per_pert.toString(), data)
            .subscribe((result) => {});
        }
      }
    }
    this.facturasPorLotes = [];
    this.Mensaje("Operación Exitosa", "Se subieron todas las facturas");
    this.getInscripciones();
  }

  busquedaGlobal() {
    this.inscripcionesFiltradas = this.inscripciones;
    if (this.tipoRegistro != "Seleccione...") {
      this.filtroRegistro();
    }
    if (this.tipoComprobante != "Seleccione...") {
      this.filtroComprobante();
    }
    if (this.tipoInscripcion != "Seleccione...") {
      this.filtroInscripcion();
    }
    if (this.tipoPago != "Seleccione...") {
      this.filtroPago();
    }
    if (this.idCarrera != null) {
      this.filtroCarrera();
      if (this.tipoSemestre != "Seleccione...") {
        this.filtroSemestre();
        if (this.tipoParalelo != "Seleccione...") {
          this.filtroParalelo();
        }
      }
    }
    /////
    this.totalAutores = 0;
    this.totalProfesionales = 0;
    this.totalEstudiantes = 0;
    this.totalRecaudacion = 0;
    this.totalRecaudacionAutores = 0;
    this.totalRecaudacionProfesionales = 0;
    this.totalRecaudacionEstudiantes = 0;

    this.inscripcionesFiltradas.forEach((element) => {
      if (element.tipo_Inscrito === "STUDENT") {
        this.totalEstudiantes++;
      } else if (element.tipo_Inscrito === "PROFESSIONAL") {
        this.totalProfesionales++;
      } else {
        this.totalAutores++;
      }
    });

    this.inscripcion.forEach((element) => {
      if (element.nom_inscr === "AUTHOR") {
        this.totalRecaudacionAutores = this.totalAutores * element.costo;
        console.log(this.totalAutoresValidados, element.costo);
      } else if (element.nom_inscr === "PROFESSIONAL") {
        this.totalRecaudacionProfesionales =
          this.totalProfesionales * element.costo;
      } else {
        this.totalRecaudacionEstudiantes =
          this.totalEstudiantes * element.costo;
      }
    });
    this.totalRecaudacion =
      this.totalRecaudacionAutores +
      this.totalRecaudacionEstudiantes +
      this.totalRecaudacionProfesionales;
  }
  restablecerBusqueda() {
    this.tipoRegistro = "Seleccione...";
    this.tipoInscripcion = "Seleccione...";
    this.tipoCarrera = "Seleccione...";
    this.tipoSemestre = "Seleccione...";
    this.tipoParalelo = "Seleccione...";
    this.tipoPago = "Seleccione...";
    this.inscripcionesFiltradas = this.inscripciones;
    this.idCarrera = null;
    this.idSemestre = null;
    this.idparalelo = null;
  }
  selectImgPatrocinador(event) {
    this.file = event.target.files[0];
    this.textoInPutPatrocinador = this.file.name;
  }
  guardarPatrocinador() {
    if (
      this.nombrePatrocinador != "" &&
      this.file != undefined &&
      this.nombrePatrocinador != "" &&
      this.linkPatrocinador != ""
    ) {
      var data = new FormData();
      data.append("nombre", this.nombrePatrocinador);
      data.append("imagen", this.file);
      data.append("estado", this.estadoPatrocinador ? String(1) : String(0));
      data.append("link", this.linkPatrocinador);

      this._patrocinadoresService
        .insertPatrocinador(data)
        .subscribe((result) => {
          this.cerrarModal();
        });
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  cambiarEstadoPatrocinador() {
    this.estadoPatrocinador = !this.estadoPatrocinador;
  }
  actualizarEstadoPatrocinador(patrocinador: Patrocinador) {
    patrocinador.estado = !patrocinador.estado;
    this._patrocinadoresService
      .editPatrocinador(patrocinador.id, patrocinador)
      .subscribe((result) => {});
  }
  editarPatrocinador(p: Patrocinador, patrocinador) {
    this.idPatrocinador = p.id;
    this.estadoPatrocinador = p.estado;
    this.nombrePatrocinador = p.nombre;
    this.textoInPutPatrocinador = p.imagen;
    this.linkPatrocinador = p.link;
    this.openPatrocinadores(patrocinador);
  }
  cambiarDatosPatrocinador() {
    if (
      this.nombrePatrocinador != "" &&
      this.nombrePatrocinador != "" &&
      this.linkPatrocinador != ""
    ) {
      var data = new FormData();

      data.append("nombre", this.nombrePatrocinador);
      this.file != undefined ? data.append("imagen", this.file) : "";
      data.append("estado", this.estadoPatrocinador ? String(1) : String(0));
      data.append("link", this.linkPatrocinador);

      this._patrocinadoresService
        .editPatrocinador(this.idPatrocinador, data)
        .subscribe((result) => {
          this.cerrarModal();
        });
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  alertPatrocinador(p: Patrocinador) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar Patrocinador?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._patrocinadoresService.deletePatrocinador(p).subscribe(() => {
          this.getPatrocinadores();
        });
      } else {
      }
    });
  }
  cambiarEstadoInfoRegistro() {
    this.estadoInfoRegistro = !this.estadoInfoRegistro;
  }
  selectImgInfoRegistro(event) {
    this.file = event.target.files[0];
    this.textoInputInfoRegistro = this.file.name;
  }
  guardarInfoRegistro() {
    if (this.file != undefined) {
      var data = new FormData();
      data.append("imagen", this.file);
      data.append("estado", this.estadoInfoRegistro ? String(1) : String(0));

      this._infoRegistroService.insertInfoRegistro(data).subscribe((result) => {
        this.cerrarModal();
        this.getInfoRegistro();
      });
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  actualizarEstadoinfoRegistro(item: InfoRegistro) {
    item.estado = !item.estado;
    this._infoRegistroService
      .editInfoRegistro(item.id, item)
      .subscribe((result) => {});
  }
  editarInfoRegistro(i: InfoRegistro, infoRegistro) {
    this.idInfoRegistro = i.id;
    this.estadoInfoRegistro = i.estado;
    this.textoInputInfoRegistro = i.imagen;
    this.openInfoRegistro(infoRegistro);
  }
  cambiarDatosInfoRegistro() {
    var data = new FormData();

    this.file != undefined ? data.append("imagen", this.file) : "";
    data.append("estado", this.estadoInfoRegistro ? String(1) : String(0));

    this._infoRegistroService
      .editInfoRegistro(this.idInfoRegistro, data)
      .subscribe((result) => {
        this.cerrarModal();
        this.getInfoRegistro();
      });
  }
  alertInfoRegistro(i: InfoRegistro) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar información del registro?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._infoRegistroService.deleteInfoRegistro(i).subscribe(() => {
          this.getInfoRegistro();
        });
      } else {
      }
    });
  }
  openEdiciones(content) {
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesEdicion();
      },
      (reason) => {
        this.resetVariablesEdicion();
      }
    );
  }
  cambiarEstadoEdicion() {
    this.estadoEdicion = !this.estadoEdicion;
  }
  editarEdicion(item: Edicion, content) {
    this.idEdicion = item.id;
    this.tituloEdicion = item.titulo;
    this.lugarEdicion = item.lugar;
    this.modalidadEdicion = item.modalidad;
    this.horasEdicion = item.horas;
    this.fechaEdicion = item.fecha;
    this.telefonoEdicion = item.telefono;
    this.correoEdicion = item.correo;
    this.webEdicion = item.web;
    this.anioEdicion = item.edicion;
    this.textoImputImgEdicion = item.imagen;
    this.textoImputPdfEdicion = item.pdf;
    this.openEdiciones(content);
  }
  guardarEdicion() {
    if (
      this.tituloEdicion != "" &&
      this.lugarEdicion != "" &&
      this.modalidadEdicion != "" &&
      this.horasEdicion != "" &&
      this.fechaEdicion != "" &&
      this.telefonoEdicion != "" &&
      this.correoEdicion != "" &&
      this.anioEdicion != ""
    ) {
      var data = new FormData();
      data.append("titulo", this.tituloEdicion);
      data.append("lugar", this.lugarEdicion);
      data.append("modalidad", this.modalidadEdicion);
      data.append("horas", this.horasEdicion);
      data.append("fecha", this.fechaEdicion);
      data.append("telefono", this.telefonoEdicion);
      data.append("correo", this.correoEdicion);
      data.append("web", this.webEdicion);
      data.append("edicion", this.anioEdicion);

      if (
        this.file != undefined &&
        this.file2 != undefined &&
        this.idEdicion === null
      ) {
        data.append("imagen", this.file);
        data.append("pdf", this.file2);
        this._edicionService.insertEdicion(data).subscribe((result) => {
          this.getEdiciones();
          this.cerrarModal();
        });
      } else {
        this.file !== undefined && this.file !== null
          ? data.append("imagen", this.file)
          : "";

        this.file2 !== undefined && this.file2 !== null
          ? data.append("pdf", this.file2)
          : "";

        this._edicionService
          .editEdicion(this.idEdicion, data)
          .subscribe((result) => {
            this.getEdiciones();
            this.cerrarModal();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }

  selectImgEdicion(event) {
    this.file = event.target.files[0];
    this.textoImputImgEdicion = this.file.name;
  }

  selectPdfEdicion(event) {
    this.file2 = event.target.files[0];
    this.textoImputPdfEdicion = this.file2.name;
  }
  resetVariablesEdicion() {
    this.tituloEdicion = "";
    this.file = undefined;
    this.file2 = undefined;
    this.lugarEdicion = "";
    this.modalidadEdicion = "";
    this.horasEdicion = "";
    this.fechaEdicion = "";
    this.telefonoEdicion = "";
    this.correoEdicion = "";
    this.webEdicion = "";
    this.anioEdicion = "";
    this.textoImputImgEdicion = "";
    this.textoImputPdfEdicion = "";
  }
  openPapers(content) {
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesPaper();
      },
      (reason) => {
        this.resetVariablesPaper();
      }
    );
  }
  resetVariablesPaper() {
    this.idPaper = null;
    this.nombrePaper = "";
    this.estadoPaper = true;
  }
  actualizarEstadoPaper(item: Paper) {
    item.estado = !item.estado;
    this._tipoPaperService.editPaper(item).subscribe();
  }
  cambiarEstadoPaper() {
    this.estadoPaper = !this.estadoPaper;
  }
  guardarPaper() {
    if (this.nombrePaper != "") {
      const paperGuardar: Paper = {
        tipo: this.nombrePaper,
        estado: this.estadoPaper,
      };
      if (this.idPaper != null) {
        paperGuardar.id = this.idPaper;
        this._tipoPaperService.editPaper(paperGuardar).subscribe((result) => {
          this.getTipoPaper();
          this.cerrarModal();
        });
      } else {
        this._tipoPaperService.insertPaper(paperGuardar).subscribe((result) => {
          this.getTipoPaper();
          this.cerrarModal();
        });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  editarPaper(item: Paper, content) {
    this.idPaper = item.id;
    this.nombrePaper = item.tipo;
    this.estadoPaper = item.estado;

    this.openPapers(content);
  }
  actualizarEstadoSemestre(item: Semestre) {
    item.estado = !item.estado;
    this._semestreService.editSemestre(item).subscribe();
  }
  actualizarEstadoCarrera(item: Carrera) {
    item.estado = !item.estado;
    this._carreraService.editCarrera(item).subscribe();
  }
  actualizarEstadoInscripcion(item: TipoInscripcion) {
    item.estado = !item.estado;
    this._tipoInscripcionService.editTipoInscripcion(item).subscribe();
  }

  openTipoDeIncripcion(content) {
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesTipoInscripcion();
      },
      (reason) => {
        this.resetVariablesTipoInscripcion();
      }
    );
  }
  resetVariablesTipoInscripcion() {
    this.idTipoInscripcion = null;
    this.nombreTipoInscripcion = "";
    this.estadoTipoInscripcion = true;
    this.precioTipoInscripcion = "";
  }
  cambiarEstadoTipoInscripcion() {
    this.estadoTipoInscripcion = !this.estadoTipoInscripcion;
  }
  guardarTipoInscripcion() {
    if ((this.nombreTipoInscripcion != "", this.precioTipoInscripcion != "")) {
      const inscripcionGuardar: TipoInscripcion = {
        nom_inscr: this.nombreTipoInscripcion,
        costo: Number(this.precioTipoInscripcion),
        estado: this.estadoTipoInscripcion,
      };
      if (this.idTipoInscripcion === null) {
        this._tipoInscripcionService
          .insertTipoInscripcion(inscripcionGuardar)
          .subscribe((result) => {
            this.CargarTipoInscripcion();
            this.cerrarModal();
          });
      } else {
        inscripcionGuardar.id = Number(this.idTipoInscripcion);
        this._tipoInscripcionService
          .editTipoInscripcion(inscripcionGuardar)
          .subscribe((result) => {
            this.CargarTipoInscripcion();
            this.cerrarModal();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  editarTipoInscripcion(item: TipoInscripcion, content) {
    this.idTipoInscripcion = item.id.toString();
    this.nombreTipoInscripcion = item.nom_inscr;
    this.estadoTipoInscripcion = item.estado;
    this.precioTipoInscripcion = item.costo.toString();
    this.openTipoDeIncripcion(content);
  }
  actualizarEstadoIdioma(item: Idioma) {
    item.estado = !item.estado;
    this._idiomaService.editIdioma(item).subscribe();
  }
  openIdioma(content) {
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesIdioma();
      },
      (reason) => {
        this.resetVariablesIdioma();
      }
    );
  }
  cambiarEstadoIdioma() {
    this.estadoIdioma = !this.estadoIdioma;
  }
  resetVariablesIdioma() {
    this.idIdioma = null;
    this.nombreIdioma = "";
    this.estadoIdioma = true;
  }
  guardarIdioma() {
    if (this.nombreIdioma != "") {
      const idiomGuardar: Idioma = {
        idioma: this.nombreIdioma,
        estado: this.estadoIdioma,
      };
      if (this.idIdioma === null) {
        this._idiomaService.insertIdioma(idiomGuardar).subscribe((result) => {
          this.getIdiomas();
          this.cerrarModal();
        });
      } else {
        idiomGuardar.id = this.idIdioma;
        this._idiomaService.editIdioma(idiomGuardar).subscribe((result) => {
          this.getIdiomas();
          this.cerrarModal();
        });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  editarIdioma(item: Idioma, content) {
    this.nombreIdioma = item.idioma;
    this.estadoIdioma = item.estado;
    this.idIdioma = item.id;
    this.openIdioma(content);
  }
  openCarrera(content) {
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesCarrera();
      },
      (reason) => {
        this.resetVariablesCarrera();
      }
    );
  }
  resetVariablesCarrera() {
    this.nombreCarrera = "";
    this.estadoCarrera = true;
    this.idCarreraActual = null;
  }
  cambiarEstadoCarrera() {
    this.estadoCarrera = !this.estadoCarrera;
  }
  guardarCarrera() {
    if (this.nombreCarrera != "") {
      const carreraGuardar: Carrera = {
        carrera: this.nombreCarrera,
        estado: this.estadoCarrera,
      };
      if (this.idCarreraActual === null) {
        this._carreraService
          .insertCarrera(carreraGuardar)
          .subscribe((result) => {
            console.log(result);
            this.CargarCarreras();
            this.cerrarModal();
          });
      } else {
        carreraGuardar.id = this.idCarreraActual;
        this._carreraService.editCarrera(carreraGuardar).subscribe((result) => {
          console.log(result);
          this.CargarCarreras();
          this.cerrarModal();
        });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  editarCarrera(item: Carrera, content) {
    this.nombreCarrera = item.carrera;
    this.estadoCarrera = item.estado;
    this.idCarreraActual = item.id;
    this.openCarrera(content);
  }
  cambiarTipoComite(item) {
    this.tipoComiteMostrar = item;
    this.filtroComite();
  }

  filtroComite() {
    this.comiteFiltrado = this.comite;

    if (this.tipoComiteMostrar != "Tipo Comite") {
      this.comiteFiltrado = this.comiteFiltrado.filter(
        (element) => element.tipo === this.tipoComiteMostrar
      );
    }
  }
  openComite(content) {
    this._cdRef.detectChanges();
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesComite();
      },
      (reason) => {
        this.resetVariablesComite();
      }
    );
  }

  resetVariablesComite() {
    this.TipoComite = "Seleccione...";
    this.nombreComte = "";
    this.CargoComite = "";
    this.InstitutoComite = "";
    this.PaisComite = "Seleccione...";
    this.EdicionComite = "";
    this.idComite = null;
    this.idTipoComite = null;
    this.validarComite = true;
  }
  actualziarTipoComite(item: TipoComite) {
    this.TipoComite = item.tipo;
    this.idTipoComite = item.id;
  }
  cambiarEstadoDelComite() {
    this.validarComite = !this.validarComite;
  }
  guardarComite() {
    if (
      this.idTipoComite != null &&
      this.nombreComte != "" &&
      this.InstitutoComite != "" &&
      this.PaisComite != ""
    ) {
      var fecha = new Date();
      var year = fecha.getFullYear();
      const comiteGuardar = {
        id: null,
        id_tipo_per: this.idTipoComite,
        nombre: this.nombreComte,
        cargo: this.CargoComite,
        instituto: this.InstitutoComite,
        pais: this.PaisComite,
        edicion: year,
        validacion: this.validarComite,
      };
      console.log(this.idComite);
      if (this.idComite === null) {
        this._comiteService.insertComite(comiteGuardar).subscribe((result) => {
          this.getComite();
          this.cerrarModal();
        });
      } else {
        comiteGuardar.id = this.idComite;
        this._comiteService.editComite(comiteGuardar).subscribe((result) => {
          this.getComite();
          this.cerrarModal();
        });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  editarComision(item: Comite, content) {
    this.idComite = item.id;
    this.TipoComite = item.tipo;
    this.tipoComite.forEach((tipo) => {
      if (tipo.tipo === item.tipo) {
        this.idTipoComite = tipo.id;
      }
    });
    this.nombreComte = item.nombre;
    this.CargoComite = item.cargo;
    this.InstitutoComite = item.instituto;
    this.PaisComite = item.pais;
    this.validarComite = item.validacion;
    this.openComite(content);
  }

  alertComite(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar Comite?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._comiteService.deleteComite(id).subscribe(() => {
          this.getComite();
        });
      } else {
      }
    });
  }
  editarRegistroAdmin(inscripcion: AdminsInscrip, content) {
    this.DIinsctipcion = inscripcion.di;
    this.nombresInscripcion = inscripcion.nombres;
    this.apellidosInscripcion = inscripcion.apellidos;
    this.tipoInscrpcion = inscripcion.tipo_Inscrito;
    this.inscripcion.forEach((element) => {
      if (element.nom_inscr === inscripcion.tipo_Inscrito) {
        this.tipoInscripcionID = element.id;
      }
    });
    this.numeroDepositoInscripcion = inscripcion.numero_Deposito;
    this.correoInscripcion = inscripcion.correo;
    this.celularInscripcion = inscripcion.celular;
    this.direccionInscripcion = inscripcion.direccion;
    if (inscripcion.estado === "V") {
      this.estadoInscripcion = true;
    } else {
      this.estadoInscripcion = false;
    }
    this.idPersonaInscripcion = inscripcion.id_per_pert;
    this.idInscripcionActual = inscripcion.numero;
    this.openRegistroAdmin(content);
  }
  openRegistroAdmin(content) {
    this._cdRef.detectChanges();
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesInscripcion();
      },
      (reason) => {
        this.resetVariablesInscripcion();
      }
    );
  }
  actualizarTipoInscripcionAdmin(item: TipoInscripcion) {
    this.tipoInscrpcion = item.nom_inscr;
    this.inscripcion.forEach((element) => {
      if (element.nom_inscr === item.nom_inscr) {
        this.tipoInscripcionID = element.id;
      }
    });
  }
  resetVariablesInscripcion() {
    this.erorInscripcion = false;
    this.DIinsctipcion = "";
    this.apellidosInscripcion = "";
    this.nombresInscripcion = "";
    this.tipoInscrpcion = "";
    this.tipoInscripcionID = null;
    this.numeroDepositoInscripcion = "";
    this.correoInscripcion = "";
    this.celularInscripcion = "";
    this.direccionInscripcion = "";
    this.estadoInscripcion = null;
    this.idPersonaInscripcion = null;
    this.idInscripcionActual = null;
  }
  guardarInscripcion() {
    if (
      this.apellidosInscripcion != "" &&
      this.nombresInscripcion != "" &&
      this.correoInscripcion != "" &&
      this.celularInscripcion != "" &&
      this.direccionInscripcion != ""
    ) {
      let divNombre = this.nombresInscripcion.split(" ");
      let divApellido = this.apellidosInscripcion.split(" ");
      const personaGuardar = {
        nom_paterno: divNombre[0],
        nom_materno: divNombre[1],
        ape_paterno: divApellido[0],
        ape_materno: divApellido[1],
        direccion: this.direccionInscripcion,
        email: this.correoInscripcion,
        celular: this.celularInscripcion,
        id_tip_ins_pert: this.tipoInscripcionID,
      };

      const inscripcionGuardar = {
        estado: this.estadoInscripcion ? "V" : "NV",
        num_deposito: this.numeroDepositoInscripcion,
      };
      this._inscripcionService
        .editInscripcion(
          this.idPersonaInscripcion.toString(),
          inscripcionGuardar
        )
        .subscribe(() => {
          this._personaService
            .editPersona(this.idPersonaInscripcion.toString(), personaGuardar)
            .subscribe(() => {
              this.cerrarModal();
              this.getInscripciones();
            });
        });
    } else {
      this.erorInscripcion = true;
      setTimeout(() => {
        this.erorInscripcion = false;
      }, 5000);
    }
  }
  editarEstadoIscripcion() {
    this.estadoInscripcion = !this.estadoInscripcion;
    console.log(this.estadoInscripcion);
  }
  openInvestigadores(content) {
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesInvestigador;
      },
      (reason) => {
        this.resetVariablesInvestigador;
      }
    );
  }
  selectImgInvestigador(event) {
    this.file = event.target.files[0];
    this.fotoInvestigador = this.file.name;
  }
  selectPDFInvestigador(event) {
    this.file2 = event.target.files[0];
    this.hojaDeVidaInvestigador = this.file2.name;
  }
  resetVariablesInvestigador() {
    this.idInvestigador = null;
    this.nombreInvestigador = "";
    this.paisInvestigador = "";
    this.fotoInvestigador = "";
    this.hojaDeVidaInvestigador = "";
    this.institucionInvestigador = "";
    this.Edicion = "";
    this.error = false;
    this.file = undefined;
    this.file2 = undefined;
  }
  guardarInvestigador() {
    if (
      this.nombreInvestigador != "" &&
      this.paisInvestigador != "" &&
      this.Edicion != "" &&
      this.institucionInvestigador != ""
    ) {
      var data = new FormData();
      data.append("nombre", this.nombreInvestigador);
      data.append("pais", this.paisInvestigador);
      data.append("Edicion", this.Edicion);
      data.append("institucion", this.institucionInvestigador);
      if (this.idInvestigador === null && this.file != undefined) {
        if (this.file != undefined) {
          data.append("foto", this.file);
        }
        if (this.file2 != undefined) {
          data.append("pdf", this.file2);
        }
        this._investigadoresService
          .insertInvestigador(data)
          .subscribe(
            () => this.getInvestigadores(),
            this.cerrarModal(),
            this.resetVariablesInvestigador
          );
      } else if (this.idInvestigador != null) {
        if (this.file != undefined) {
          data.append("foto", this.file);
        }
        if (this.file2 != undefined) {
          data.append("pdf", this.file2);
        }

        this._investigadoresService
          .editInvestigador(this.idInvestigador, data)
          .subscribe(
            () => this.getInvestigadores(),
            this.cerrarModal(),
            this.resetVariablesInvestigador()
          );
      } else {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  eliminarInvestigador(item: Investigador) {
    this._investigadoresService
      .deleteInvestigador(item)
      .subscribe(() => this.getInvestigadores());
  }
  editarInvestigador(item: Investigador, context) {
    this.idInvestigador = item.id;
    this.nombreInvestigador = item.nombre;
    this.paisInvestigador = item.pais;
    this.fotoInvestigador = item.foto;
    this.hojaDeVidaInvestigador = item.hoja_de_vida;
    this.institucionInvestigador = item.institucion;
    this.Edicion = item.Edicion;
    this.openInvestigadores(context);
  }

  VIDEOGAMES = [
    {
      id: 1,
      name: "Animal Crossing",
      platform: "Nintendo Switch",
      reference: "1-770-736-8031",
    },
    {
      id: 2,
      name: "The Legend of Zelda: Ocarina of Time CV",
      platform: "Wii U",
      reference: "1-770-736-2323",
    },
    {
      id: 3,
      name: "Metal Gear Solid",
      platform: "Playstation (PSX)",
      reference: "1-4564-736-334",
    },
    {
      id: 4,
      name: "ShenMue",
      platform: "Sega Dreamcast",
      reference: "3-770-736-4532",
    },
    {
      id: 5,
      name: "Rise of the Tomb Raider",
      platform: "Playstation 4",
      reference: "1-324-736-3245",
    },
    {
      id: 6,
      name: "Resident Evil 2",
      platform: "Playstation",
      reference: "1-123-3336-4321",
    },
    {
      id: 1,
      name: "Animal Crossing",
      platform: "Nintendo Switch",
      reference: "1-770-736-8031",
    },
    {
      id: 2,
      name: "The Legend of Zelda: Ocarina of Time CV",
      platform: "Wii U",
      reference: "1-770-736-2323",
    },
    {
      id: 3,
      name: "Metal Gear Solid",
      platform: "Playstation (PSX)",
      reference: "1-4564-736-334",
    },
    {
      id: 4,
      name: "ShenMue",
      platform: "Sega Dreamcast",
      reference: "3-770-736-4532",
    },
    {
      id: 5,
      name: "Rise of the Tomb Raider",
      platform: "Playstation 4",
      reference: "1-324-736-3245",
    },
    {
      id: 6,
      name: "Resident Evil 2",
      platform: "Playstation",
      reference: "1-123-3336-4321",
    },
    {
      id: 1,
      name: "Animal Crossing",
      platform: "Nintendo Switch",
      reference: "1-770-736-8031",
    },
    {
      id: 2,
      name: "The Legend of Zelda: Ocarina of Time CV",
      platform: "Wii U",
      reference: "1-770-736-2323",
    },
    {
      id: 3,
      name: "Metal Gear Solid",
      platform: "Playstation (PSX)",
      reference: "1-4564-736-334",
    },
    {
      id: 4,
      name: "ShenMue",
      platform: "Sega Dreamcast",
      reference: "3-770-736-4532",
    },
    {
      id: 5,
      name: "Rise of the Tomb Raider",
      platform: "Playstation 4",
      reference: "1-324-736-3245",
    },
    {
      id: 6,
      name: "Resident Evil 2",
      platform: "Playstation",
      reference: "1-123-3336-4321",
    },
    {
      id: 1,
      name: "Animal Crossing",
      platform: "Nintendo Switch",
      reference: "1-770-736-8031",
    },
    {
      id: 2,
      name: "The Legend of Zelda: Ocarina of Time CV",
      platform: "Wii U",
      reference: "1-770-736-2323",
    },
    {
      id: 3,
      name: "Metal Gear Solid",
      platform: "Playstation (PSX)",
      reference: "1-4564-736-334",
    },
    {
      id: 4,
      name: "ShenMue",
      platform: "Sega Dreamcast",
      reference: "3-770-736-4532",
    },
    {
      id: 5,
      name: "Rise of the Tomb Raider",
      platform: "Playstation 4",
      reference: "1-324-736-3245",
    },
    {
      id: 6,
      name: "Resident Evil 2",
      platform: "Playstation",
      reference: "1-123-3336-4321",
    },
  ];

  getPDF() {
    var HTML_Width = $(".canvas_div_pdf").width();
    var HTML_Height = $(".canvas_div_pdf").height();
    var top_left_margin = 0;
    var PDF_Width = HTML_Width + top_left_margin * 2;
    var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($(".canvas_div_pdf")[0], { allowTaint: true }).then(function (
      canvas
    ) {
      canvas.getContext("2d");

      console.log(canvas.height + "  " + canvas.width);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
      pdf.addImage(
        imgData,
        "JPG",
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height
      );

      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(PDF_Width, PDF_Height);
        pdf.addImage(
          imgData,
          "JPG",
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }

      pdf.save("HTML-Document.pdf");
    });
  }

  nombreComiteBuscar: string = "";
  busquedaComite() {}
  eliminarCarrera(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar Carrera?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._carreraService.deleteCarrera(id).subscribe(() => {
          this.CargarCarreras();
        });
      } else {
      }
    });
  }
  eliminarPaper(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar Carrera?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._tipoPaperService.deletePaper(id).subscribe(() => {
          this.getTipoPaper();
        });
      } else {
      }
    });
  }
  resetVariablesInfoCongreso() {
    this.nombreCongreso = "";
    this.tituloCongreso = "";
    this.fechaCongreso = "";
    this.logoCongreso = "";
    this.faviconCongreso = "";
    this.error = false;
    this.idCongreso = null;
    this.file = undefined;
    this.file2 = undefined;
  }
  selectLogoCongreso(event) {
    this.file = event.target.files[0];
    this.logoCongreso = this.file.name;
  }

  selectFaviconCongreso(event) {
    this.file2 = event.target.files[0];
    this.faviconCongreso = this.file.name;
  }
  openInfoCongreso(content) {
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesInfoCongreso();
      },
      (reason) => {
        this.resetVariablesInfoCongreso();
      }
    );
  }
  editarInfoCongreso(item: InformacionCongreso, content) {
    this.idCongreso = String(item.id);
    this.nombreCongreso = item.nombre;
    this.tituloCongreso = item.titulo;
    this.fechaCongreso = item.fecha;
    this.logoCongreso = item.logo;
    this.faviconCongreso = item.favicon;
    this.openInfoCongreso(content);
  }
  guardarInformacionRegistro() {
    if (
      this.nombreCongreso != "" &&
      this.tituloCongreso != "" &&
      this.tituloCongreso != ""
    ) {
      var data = new FormData();
      data.append("nombre", this.nombreCongreso);
      data.append("titulo", this.tituloCongreso);
      data.append("fecha", this.fechaCongreso);
      if (this.file != undefined) {
        data.append("logo", this.file);
      }
      if (this.file2 != undefined) {
        data.append("favicon", this.file2);
      }
      this._informacionCongresoService
        .editInfo(this.idCongreso, data)
        .subscribe((result) => {
          this.getInformacionCongreso();
          this.cerrarModal();
        });
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  openImgPortada(content) {
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesImgPortada();
      },
      (reason) => {
        this.resetVariablesImgPortada();
      }
    );
  }
  resetVariablesImgPortada() {
    this.idImgPortada = null;
    this.imagenPortada = "";
    this.linkImgPortada = "";
    this.estadoImgPortada = true;
    this.error = false;
  }
  cambiarEstadoImagenPortada() {
    this.estadoImgPortada = !this.estadoImgPortada;
  }
  guardarImagenPortada() {
    var data = new FormData();
    data.append("link", this.linkImgPortada);
    data.append("estado", this.estadoImgPortada ? "1" : "0");
    if (this.idImgPortada === null) {
      if (this.file != undefined) {
        data.append("imagen", this.file);
        this._imagenesPortada.insertImagenPortada(data).subscribe((result) => {
          this.getImagenesPortada();
          this.cerrarModal();
        });
      } else {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    } else {
      if (this.file != undefined) {
        data.append("imagen", this.file);
      }
      this._imagenesPortada
        .editImagenPortada(this.idImgPortada, data)
        .subscribe((result) => {
          this.getImagenesPortada();
          this.cerrarModal();
        });
    }
  }
  selectImgPortada(event) {
    this.file = event.target.files[0];
    this.imagenPortada = this.file.name;
    console.log(this.imagenPortada);
  }
  editImgPortada(item: ImagenesPortada, content) {
    this.idImgPortada = item.id;
    this.imagenPortada = item.imagen;
    this.linkImgPortada = item.link;
    this.estadoImgPortada = item.estado;
    this.openImgPortada(content);
  }
  //Reportes
  openModalReportes(content) {
    const fecha = new Date();
    this.fechaCreacionReporte =
      fecha.getFullYear() +
      "/" +
      fecha.getMonth() +
      "/" +
      fecha.getDay() +
      "  " +
      fecha.getHours() +
      ":" +
      fecha.getMinutes() +
      ":" +
      fecha.getSeconds();
    let size;
    if (content._declarationTContainer.localNames[0] === "reporteGeneral") {
      this.contarInscritos();
      size = "lg";
    } else {
      this.busquedaGlobal();
      size = "xl";
    }

    this.modalRef = this._modalService.open(content, { size: size });
    this.modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
  }

  contarInscritos() {
    this.inscritosValidados = 0;
    this.totalEstudiantes = 0;
    this.totalProfesionales = 0;
    this.totalAutores = 0;
    this.totalestudiantesValidados = 0;
    this.totalProfesionalesValidados = 0;
    this.totalAutoresValidados = 0;
    this.totalRecaudacion = 0;
    this.totalRecaudacionAutores = 0;
    this.totalRecaudacionProfesionales = 0;
    this.totalRecaudacionEstudiantes = 0;
    this.pagoEfectivo = 0;
    this.pagoTarjeta = 0;

    this.inscripciones.forEach((element) => {
      if (element.tipo_Inscrito === "STUDENT") {
        this.totalEstudiantes++;
        if (element.estado === "V") {
          this.totalestudiantesValidados++;
          if (element.tipo_Pago === "CASH") {
            this.pagoEfectivo++;
          } else {
            this.pagoTarjeta++;
          }
        }
      } else if (element.tipo_Inscrito === "PROFESSIONAL") {
        this.totalProfesionales++;
        if (element.estado === "V") {
          this.totalProfesionalesValidados++;
          if (element.tipo_Pago === "CASH") {
            this.pagoEfectivo++;
          } else {
            this.pagoTarjeta++;
          }
        }
      } else {
        this.totalAutores++;
        if (element.estado === "V") {
          this.totalAutoresValidados++;
          if (element.tipo_Pago === "CASH") {
            this.pagoEfectivo++;
          } else {
            this.pagoTarjeta++;
          }
        }
      }
      this.inscritosValidados =
        this.totalestudiantesValidados + this.totalProfesionalesValidados;
    });
    //Calculano totales
    this.inscripcion.forEach((element) => {
      if (element.nom_inscr === "AUTHOR") {
        this.totalRecaudacionAutores =
          this.totalAutoresValidados * element.costo;
      } else if (element.nom_inscr === "PROFESSIONAL") {
        this.totalRecaudacionProfesionales =
          this.totalProfesionalesValidados * element.costo;
      } else {
        this.totalRecaudacionEstudiantes =
          this.totalestudiantesValidados * element.costo;
      }
    });
    this.totalRecaudacion =
      this.totalRecaudacionEstudiantes +
      this.totalRecaudacionProfesionales +
      this.totalRecaudacionAutores;
    //Seteando datos
    this.barChartDataInscritos = [
      {
        data: [
          this.inscritosValidados,
          this.inscripciones.length - this.inscritosValidados,
        ],
        label: "Colors",
        backgroundColor: [
          "#000000",
          "#5f1915",
          "#802417",
          "#9b182b",
          "#b20d17",
        ],
      },
    ];
    this.barChartDataInscritosTipo = [
      {
        data: [
          this.totalEstudiantes,
          this.totalProfesionales,
          this.totalAutores,
        ],
        label: "Colors",
        backgroundColor: [
          "#000000",
          "#5f1915",
          "#802417",
          "#9b182b",
          "#b20d17",
        ],
      },
    ];
    this.barChartDataEstudiantes = [
      {
        data: [
          this.totalestudiantesValidados,
          this.totalEstudiantes - this.totalestudiantesValidados,
        ],
        label: "Colors",
        backgroundColor: [
          "#000000",
          "#5f1915",
          "#802417",
          "#9b182b",
          "#b20d17",
        ],
      },
    ];
    this.barChartDataProfesionales = [
      {
        data: [
          this.totalProfesionalesValidados,
          this.totalProfesionales - this.totalProfesionalesValidados,
        ],
        label: "Colors",
        backgroundColor: [
          "#000000",
          "#5f1915",
          "#802417",
          "#9b182b",
          "#b20d17",
        ],
      },
    ];
    this.barChartDataAutores = [
      {
        data: [
          this.totalAutoresValidados,
          this.totalAutores - this.totalAutoresValidados,
        ],
        label: "Colors",
        backgroundColor: [
          "#000000",
          "#5f1915",
          "#802417",
          "#9b182b",
          "#b20d17",
        ],
      },
    ];
    this.barChartDataTotales = [
      {
        data: [
          this.totalRecaudacionEstudiantes,
          this.totalRecaudacionProfesionales,
          this.totalRecaudacionAutores,
        ],
        label: "Colors",
        backgroundColor: [
          "#000000",
          "#5f1915",
          "#802417",
          "#9b182b",
          "#b20d17",
        ],
      },
    ];
    this.barChartDataTipoPago = [
      {
        data: [this.pagoEfectivo, this.pagoTarjeta],
        label: "Colors",
        backgroundColor: [
          "#000000",
          "#5f1915",
          "#802417",
          "#9b182b",
          "#b20d17",
        ],
      },
    ];
  }
  //Graficos
  //Esto cambia en los dataset
  public barChartDataInscritos = null;
  public barChartLabelsInscritos = [
    "Registros Validados",
    "Registros sin validar",
  ];
  ///
  public barChartDataInscritosTipo = null;
  public barChartLabelsInscritosTipo = [
    "Estudiantes",
    "Profesionales",
    "Autores",
  ];
  ///
  public barChartDataEstudiantes = null;
  public barChartLabelsEstudiantes = [
    "Estudiantes validados",
    "Estudiantes sin validar",
  ];
  ///
  public barChartDataProfesionales = null;
  public barChartLabelsProfesionales = [
    "Profesionales validados",
    "Profesionales sin validar",
  ];
  ///
  public barChartDataAutores = null;
  public barChartLabelsAutores = ["Autores validados", "Autores sin validar"];
  ///////////
  public barChartDataTotales = null;
  public barChartLabelsTotales = ["Estudiantes", "Profesionales", "Autores"];
  ///////////
  public barChartDataTipoPago = null;
  public barChartLabelsTipoPago = ["Efectivo", "Tarjeta"];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  //De pastel
  public barChartType = "pie";
  public barChartLegend = true;
  openConfiCertificados(content, item?: ConfiCertificados) {
    if (item != undefined) {
      this.idConfiCertificado = String(item.id);
      this.nombreCertificado = item.nombre;
      this.plantillaCertificado = item.plantilla;
    }

    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesConfiCertificados();
      },
      (reason) => {
        this.resetVariablesConfiCertificados();
      }
    );
  }
  resetVariablesConfiCertificados() {
    this.idConfiCertificado = "";
    this.nombreCertificado = "";
    this.plantillaCertificado = "";
    this.error = false;
    this.file = undefined;
  }
  selectPlantilla(event) {
    this.file = event.target.files[0];
    this.plantillaCertificado = this.file.name;
  }
  /*  guardarConfiCertificado() {
    if (this.nombreCertificado != "") {
      var data = new FormData();
      data.append("nombre", this.nombreCertificado);
      data.append("tipo", this.plantillaTipo);
      if (this.idConfiCertificado === "") {
        if (this.file != undefined) {
          data.append("plantilla", this.file);
          this._confi_certificados
            .insertConfiCertificados(data)
            .subscribe(() => {
              this.cerrarModal();
              this.getConfiCertificados();
            });
        } else {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else {
        this.file != undefined ? data.append("plantilla", this.file) : "";
        this._confi_certificados
          .editConfiCertificados(this.idConfiCertificado, data)
          .subscribe(() => {
            this.cerrarModal();
            this.getConfiCertificados();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  } */
  onLogOut() {
    this._authService.logOut();
    this.router.navigate(["/admin"]);
  }
  openGaleriaModal(content, galeria: Galeria) {
    if (galeria != undefined) {
      this.galeriaSeleccionada = galeria;
      this.nombreGaleria = galeria.nombre;
      this.imagenGaleria = galeria.imagen;
    }
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesGaleria();
      },
      (reason) => {
        this.resetVariablesGaleria();
      }
    );
  }
  resetVariablesGaleria() {
    this.nombreGaleria = "";
    this.imagenGaleria = "";
    this.galeriaSeleccionada = undefined;
    this.file = undefined;
  }
  selectImgGaleria(event) {
    this.file = event.target.files[0];
    this.imagenGaleria = this.file.name;
  }

  guardarGaleriaLugar() {
    if (this.nombreGaleria != "") {
      var data = new FormData();
      data.append("nombre", this.nombreGaleria);
      if (this.galeriaSeleccionada === undefined) {
        data.append("imagen", this.file);

        if (this.file != undefined) {
          this._galeriaLugarService.insertGaleria(data).subscribe(() => {
            this.cerrarModal();
            this.getGaleriaLugar();
          });
        } else {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else {
        this.file != undefined ? data.append("imagen", this.file) : "";
        this._galeriaLugarService
          .editGaleria(this.galeriaSeleccionada.id, data)
          .subscribe(() => {
            this.cerrarModal();
            this.getGaleriaLugar();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }

  guardarGaleriaInfo() {
    if (this.galeriaSeleccionada === undefined) {
    }
    if (this.nombreGaleria != "") {
      var data = new FormData();
      data.append("nombre", this.nombreGaleria);
      if (this.galeriaSeleccionada === undefined) {
        if (this.file != undefined) {
          data.append("imagen", this.file);
          this._galeriaInformacionService.insertGaleria(data).subscribe(() => {
            this.cerrarModal();
            this.getGaleriaInformacion();
          });
        } else {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else {
        this.file != undefined ? data.append("imagen", this.file) : "";
        this._galeriaInformacionService
          .editGaleria(this.galeriaSeleccionada.id, data)
          .subscribe(() => {
            this.cerrarModal();
            this.getGaleriaInformacion();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  resetVariablesPresentacion() {
    this.textoPresentacion = "";
    this.imagen_boton_1 = "";
    this.link_boton_1 = "";
    this.link_boton_2 = "";
    this.imagen_boton_2 = "";
    this.file = undefined;
    this.file2 = undefined;
    this.error = false;
  }

  openPresentacion(content, presentacion: Presentacion) {
    this.textoPresentacion = presentacion.texto;
    this.imagen_boton_1 = presentacion.imagen_boton_1;
    this.link_boton_1 = presentacion.link_boton_1;
    this.link_boton_2 = presentacion.link_boton_2;
    this.imagen_boton_2 = presentacion.imagen_boton_2;

    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesPresentacion();
      },
      (reason) => {
        this.resetVariablesPresentacion();
      }
    );
  }
  selectImg1Presentacion(event) {
    this.file = event.target.files[0];
    this.imagen_boton_1 = this.file.name;
  }
  selectImg2Presentacion(event) {
    this.file2 = event.target.files[0];
    this.imagen_boton_2 = this.file2.name;
  }
  guardarPresentacion() {
    if (this.textoPresentacion != "") {
      var data = new FormData();

      data.append("texto", this.textoPresentacion);
      this.file != undefined ? data.append("imagen_boton_1", this.file) : "";
      this.file2 != undefined ? data.append("imagen_boton_2", this.file2) : "";
      data.append("link_boton_1", this.link_boton_1);
      data.append("link_boton_2", this.link_boton_2);
      this._presentacionService
        .editPresentacion(1, data)
        .subscribe((result) => {
          this.getPresentacion();
          this.cerrarModal();
        });
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  texto1LugarEvento = "";
  texto2LugarEvento = "";
  imagenLugarEvento = "";
  resetVariablesLugarDelEvento() {
    this.texto1LugarEvento = "";
    this.texto2LugarEvento = "";
    this.imagenLugarEvento = "";
    this.file = undefined;
    this.error = false;
  }
  openLugarDelEvento(content, lugarDelEvento: LugarDelEvento) {
    this.texto1LugarEvento = lugarDelEvento.texto_1;
    this.texto2LugarEvento = lugarDelEvento.texto_2;
    this.imagenLugarEvento = lugarDelEvento.imagen;

    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesLugarDelEvento();
      },
      (reason) => {
        this.resetVariablesLugarDelEvento();
      }
    );
  }
  selectImgLugarDelEvento(event) {
    this.file = event.target.files[0];
    this.imagenLugarEvento = this.file.name;
  }
  guardarLugarDelEvento() {
    var data = new FormData();
    if (this.texto1LugarEvento != "" && this.texto2LugarEvento != "") {
      data.append("texto_1", this.texto1LugarEvento);
      data.append("texto_2", this.texto2LugarEvento);
      this.file != undefined ? data.append("imagen", this.file) : "";

      this._lugarDelEventoService
        .editLugarDelEvento(1, data)
        .subscribe((result) => {
          this.getLugarDelEvento();
          this.cerrarModal();
        });
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }

  openInformacionTuristica(content, item?: InformacionTuristica) {
    if (item != undefined) {
      this.informacionTuristicaSeleccionada = item;
      this.textoInformacionTuristica = item.texto;
      this.imagen_boton_1 = item.boton1;
      this.link_boton_1 = item.link1;
      this.link_boton_2 = item.link2;
      this.imagen_boton_2 = item.boton2;
    }

    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesInformacionTuristica();
      },
      (reason) => {
        this.resetVariablesInformacionTuristica();
      }
    );
  }

  guardarInformacionTuristica() {
    var data = new FormData();
    data.append("texto", this.textoInformacionTuristica);
    this.file != undefined ? data.append("boton1", this.file) : "";
    this.file2 != undefined ? data.append("boton2", this.file2) : "";
    this.link_boton_1 != "" ? data.append("link1", this.link_boton_1) : "";
    this.link_boton_2 != "" ? data.append("link2", this.link_boton_2) : "";
    if (this.informacionTuristicaSeleccionada === undefined) {
      if (this.textoInformacionTuristica != "") {
        this._informacionTuristica
          .insertInformacionTuristica(data)
          .subscribe((result) => {
            this.getInformacionTuristica();
            this.cerrarModal();
          });
      } else {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    } else {
      console.log(this.informacionTuristicaSeleccionada);
      this._informacionTuristica
        .editInformacionTuristica(
          this.informacionTuristicaSeleccionada.id,
          data
        )
        .subscribe((result) => {
          this.getInformacionTuristica();
          this.cerrarModal();
        });
    }
  }
  resetVariablesInformacionTuristica() {
    this.textoInformacionTuristica = "";
    this.informacionTuristicaSeleccionada = undefined;
    this.imagen_boton_1 = "";
    this.link_boton_1 = "";
    this.link_boton_2 = "";
    this.imagen_boton_2 = "";
    this.file = undefined;
    this.file2 = undefined;
    this.error = false;
  }
  eliminarInformacionTuristica(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar información?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._informacionTuristica
          .deleteInformacionTuristica(id)
          .subscribe((result) => {
            this.getInformacionTuristica();
          });
      } else {
      }
    });
  }

  openPrograma(content, item?: Programa): void {
    if (item != undefined) {
      this.programaSeleccionaado = item;
      this.descripcionPrograma = item.descripcion;
      this.botonPrograma = item.boton;
      this.linkPrograma = item.link;
      this.imagenPrograma = item.imagen;
      this.programaPrograma = item.programa;
    }
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesInformacionTuristica();
      },
      (reason) => {
        this.resetVariablesInformacionTuristica();
      }
    );
  }
  resetVariablesPrograma(): void {
    this.programaSeleccionaado = undefined;
    this.descripcionPrograma = "";
    this.botonPrograma = "";
    this.linkPrograma = "";
    this.imagenPrograma = "";
    this.programaPrograma = "";
    this.file = undefined;
  }
  selectImgPrograma(event) {
    this.file = event.target.files[0];
    this.imagenPrograma = this.file.name;
  }
  guardarPrograma() {
    if (this.descripcionPrograma != "" && this.programaPrograma != "") {
      var data = new FormData();
      data.append("descripcion", this.descripcionPrograma);
      data.append("boton", this.botonPrograma);
      data.append("link", this.linkPrograma);
      data.append("programa", this.programaPrograma);
      this.file != undefined ? data.append("imagen", this.file) : "";
      if (this.programaSeleccionaado === undefined) {
        this._programaService.insertPrograma(data).subscribe((result) => {
          this.cerrarModal();
          this.getPrograma();
        });
      } else {
        console.log(this.programaSeleccionaado);
        this._programaService
          .editPrograma(this.programaSeleccionaado.id, data)
          .subscribe((result) => {
            this.cerrarModal();
            this.getPrograma();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  eliminarPrograma(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar programa?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._programaService.deletePrograma(id).subscribe((result) => {
          this.getPrograma();
        });
      } else {
      }
    });
  }
  openEnvioTrabajos(content, item?: EnvioTrabajos) {
    if (item != undefined) {
      this.envioTrabajoSeleccionado = item;
      this.textoEnvioTrabajos = item.texto;
      this.botonEnvioTrabajos = item.boton;
      this.linkEnvioTrabajos = item.link;
    }
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesEnvioTrabajos();
      },
      (reason) => {
        this.resetVariablesEnvioTrabajos();
      }
    );
  }
  resetVariablesEnvioTrabajos() {
    this.textoEnvioTrabajos = "";
    this.botonEnvioTrabajos = "";
    this.linkEnvioTrabajos = "";
    this.file = undefined;
    this.envioTrabajoSeleccionado = undefined;
  }
  selectImgEnvioTrabajos(event) {
    this.file = event.target.files[0];
    this.botonEnvioTrabajos = this.file.name;
  }
  guardarEnvioTrabajo() {
    if (
      this.textoEnvioTrabajos != "" &&
      this.botonEnvioTrabajos != "" &&
      this.linkEnvioTrabajos != ""
    ) {
      var data = new FormData();
      data.append("texto", this.textoEnvioTrabajos);
      this.file != undefined ? data.append("boton", this.file) : "";
      data.append("link", this.linkEnvioTrabajos);
      if (this.envioTrabajoSeleccionado === undefined) {
        this._envioTrabajosService
          .insertEnvioTrabajo(data)
          .subscribe((result) => {
            this.getEnvioTrabajos();
            this.cerrarModal();
          });
      } else {
        this._envioTrabajosService
          .editEnvioTrabajo(this.envioTrabajoSeleccionado.id, data)
          .subscribe((result) => {
            this.getEnvioTrabajos();
            this.cerrarModal();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  eliminarEnvioTrabajos(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar Envio Trabajo?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._envioTrabajosService
          .deleteEnvioTrabajo(id)
          .subscribe((result) => {
            this.getEnvioTrabajos();
          });
      } else {
      }
    });
  }
  openEnvioTrabajosFormatos(content, item?: EnvioTrabajosFormato) {
    if (item != undefined) {
      this.envioTrabajoSeleccionado = item;
      this.textoEnvioTrabajos = item.texto;
      this.botonEnvioTrabajos = item.boton;
      this.linkEnvioTrabajos = item.link;
    }
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesEnvioTrabajos();
      },
      (reason) => {
        this.resetVariablesEnvioTrabajos();
      }
    );
  }
  guardarEnvioTrabajoFormato() {
    if (
      this.textoEnvioTrabajos != "" &&
      this.botonEnvioTrabajos != "" &&
      this.linkEnvioTrabajos != ""
    ) {
      var data = new FormData();
      data.append("texto", this.textoEnvioTrabajos);
      this.file != undefined ? data.append("boton", this.file) : "";
      data.append("link", this.linkEnvioTrabajos);
      if (this.envioTrabajoSeleccionado === undefined) {
        this._envioTrabajosFormatosService
          .insertEnvioTrabajoFormato(data)
          .subscribe((result) => {
            this.getEnvioTrabajosFormatos();
            this.cerrarModal();
          });
      } else {
        this._envioTrabajosFormatosService
          .editEnvioTrabajoFormato(this.envioTrabajoSeleccionado.id, data)
          .subscribe((result) => {
            this.getEnvioTrabajosFormatos();
            this.cerrarModal();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  eliminarEnvioTrabajosFormatos(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar envio trabajo formato?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._envioTrabajosFormatosService
          .deleteEnvioTrabajoFormato(id)
          .subscribe((result) => {
            this.getEnvioTrabajosFormatos();
          });
      } else {
      }
    });
  }

  actividadEnvioTrabajoFecha: string = "";
  fechaEnvioTrabajoFecha: string = "";
  envioTrabajoFechaSeleccionado: EnvioTrabajosFechas = undefined;
  resetVariablesEnvioTrabajoFechas() {
    this.actividadEnvioTrabajoFecha = "";
    this.fechaEnvioTrabajoFecha = "";
    this.envioTrabajoFechaSeleccionado = undefined;
  }
  openEnvioTrabajosFechas(content, item?: EnvioTrabajosFechas) {
    if (item != undefined) {
      this.envioTrabajoFechaSeleccionado = item;
      this.fechaEnvioTrabajoFecha = item.fecha;
      this.actividadEnvioTrabajoFecha = item.actividad;
    }
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesEnvioTrabajoFechas();
      },
      (reason) => {
        this.resetVariablesEnvioTrabajoFechas();
      }
    );
  }
  guardarEnvioTrabajoFecha() {
    if (
      this.fechaEnvioTrabajoFecha != "" &&
      this.actividadEnvioTrabajoFecha != ""
    ) {
      const enviar = {
        fecha: this.fechaEnvioTrabajoFecha,
        actividad: this.actividadEnvioTrabajoFecha,
      };

      if (this.envioTrabajoFechaSeleccionado === undefined) {
        this._envioTrabajosFechasService
          .insertEnvioTrabajoFecha(enviar)
          .subscribe((result) => {
            this.getEnvioTrabajosFechas();
            this.cerrarModal();
          });
      } else {
        this._envioTrabajosFechasService
          .editEnvioTrabajoFecha(this.envioTrabajoFechaSeleccionado.id, enviar)
          .subscribe((result) => {
            this.getEnvioTrabajosFechas();
            this.cerrarModal();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  eliminarEnvioTrabajosFechas(id: string) {
    console.log(id);
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar fecha?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._envioTrabajosFechasService
          .deleteEnvioTrabajoFecha(id)
          .subscribe((result) => {
            this.getEnvioTrabajosFechas();
          });
      } else {
      }
    });
  }
  cambiarEstadoComite(item: Comite) {
    const enviar = {
      id: item.id,
      validacion: !item.validacion,
    };
    this._comiteService.editComite(enviar).subscribe((result) => {});
  }
  tituloTemario: string = "";
  temarioSeleccionado: Temario = undefined;
  temarioTemaSeleccionado: TemarioTemas = undefined;
  idTemarioPertenece = null;
  openTemario(content, tamerio?: Temario) {
    if (tamerio != undefined) {
      this.temarioSeleccionado = tamerio;
      this.tituloTemario = tamerio.titulo;
    }
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariableTemario();
      },
      (reason) => {
        this.resetVariableTemario();
      }
    );
  }
  resetVariableTemario() {
    this.tituloTemario = "";
    this.temarioSeleccionado = undefined;
    this.temarioTemaSeleccionado = undefined;
    this.idTemarioPertenece = null;
  }
  guardarTemario() {
    if (this.tituloTemario != "") {
      const enviar = {
        titulo: this.tituloTemario,
      };

      if (this.temarioSeleccionado === undefined) {
        this._temarioService.insertTemario(enviar).subscribe((result) => {
          this.getTemarios();
          this.cerrarModal();
        });
      } else {
        this._temarioService
          .editTemarios(this.temarioSeleccionado.id, enviar)
          .subscribe((result) => {
            this.getTemarios();
            this.cerrarModal();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  eliminarTemario(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar Tema?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._temarioService.deleteTemario(id).subscribe((result) => {
          this.getTemarios();
        });
      } else {
      }
    });
  }
  openTemarioTema(content, idTemario: number, tema?: TemarioTemas) {
    this.idTemarioPertenece = idTemario;
    if (tema != undefined) {
      this.temarioTemaSeleccionado = tema;
      this.tituloTemario = tema.tema;
    }
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariableTemario();
      },
      (reason) => {
        this.resetVariableTemario();
      }
    );
  }
  guardarTemarioTema() {
    if (this.tituloTemario != "") {
      const enviar = {
        id_tema_per: this.idTemarioPertenece,
        tema: this.tituloTemario,
      };

      if (this.temarioTemaSeleccionado === undefined) {
        this._temarioTemasServices
          .insertTemarioTemas(enviar)
          .subscribe((result) => {
            this.getTemariosTemas();
            this.cerrarModal();
          });
      } else {
        this._temarioTemasServices
          .editTemarioTemas(this.temarioTemaSeleccionado.id, enviar)
          .subscribe((result) => {
            this.getTemariosTemas();
            this.cerrarModal();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  eliminarTemarioTema(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar Tema?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._temarioTemasServices
          .deleteTemarioTemas(id)
          .subscribe((result) => {
            this.getTemariosTemas();
          });
      } else {
      }
    });
  }

  openInicio(content, inicio: Inicio) {
    this.inicioSeleccionado = inicio;
    if (this.inicioSeleccionado != undefined) {
      this.texto_llamado_inicio=this.inicioSeleccionado.texto_llamado;
      this.imagen_llamado_inicio=this.inicioSeleccionado.imagen_llamado;
      this.link_llamado_inicio=this.inicioSeleccionado.link_llamado;
    }
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
        this.resetVariablesInicio();
      },
      (reason) => {
        this.resetVariablesInicio();
      }
    );
  }
  texto_llamado_inicio = "";
  imagen_llamado_inicio = "";
  link_llamado_inicio = "";
  resetVariablesInicio() {
    this.texto_llamado_inicio = "";
    this.imagen_llamado_inicio = "";
    this.link_llamado_inicio = "";
    this.file = undefined;
    this.inicioSeleccionado=undefined;
  }
  selectImgLlamadoInicio(event) {
    this.file = event.target.files[0];
    this.imagen_llamado_inicio = this.file.name;
  }
  guardarInicio() {
    if (this.texto_llamado_inicio != "") {
      var data = new FormData();
      data.append("texto_llamado", this.texto_llamado_inicio);
    this.file!=undefined ?  data.append("imagen_llamado", this.file) : "";
    data.append("link_llamado", this.link_llamado_inicio);

      if (this.inicioSeleccionado === undefined) {
        this._inicioService
          .insertInicio(data)
          .subscribe((result) => {
            this.getInicio();
            this.cerrarModal();
          });
      } else {
        this._inicioService
          .editInicio(this.inicioSeleccionado.id,data)
          .subscribe((result) => {
            this.getInicio();
            this.cerrarModal();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  eliminarInicio(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar Inicio?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._inicioService
          .deleteInicio(id)
          .subscribe((result) => {
            this.getInicio();
          });
      } else {
      }
    });
  }
  openCronogramaJornada(content, inicio: Inicio) {

    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
       
      },
      (reason) => {
       
      }
    );
  }
  openCronogramaDias(content,cronogramaJornada:ProgramaJornada, cronogramaDia?:ProgramaDias) {
    this.cronogramaJornadaSeleccinado=cronogramaJornada;
    if(cronogramaDia != undefined){
      this.cronogramaDiaSeleccinado= cronogramaDia;
      this.cronogramaDiaFecha= cronogramaDia.fecha;
    }

    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
      this.resetVariablesCronogramaDia();
      },
      (reason) => {
        this.resetVariablesCronogramaDia();
      }
    );
  }
  cronogramaDetalleActividad:string = "";
  cronogramaDetalleHora:string = "";
  cronogramaDiaSeleccinado:ProgramaDias=undefined;
  cronogramaDetalleSeleccionado:ProgramaDetalle=undefined;
  //
  cronogramaJornadaSeleccinado:ProgramaJornada=undefined;
  cronogramaDiaFecha:string = "";
  resetVariablesCronogramaDetalle(){
    this.cronogramaDetalleActividad = "";
  this.cronogramaDetalleHora = "";
  this.cronogramaDiaSeleccinado=undefined;
  this.cronogramaDetalleSeleccionado=undefined;
  }
  resetVariablesCronogramaDia(){
  this.cronogramaDiaFecha = "";
  this.cronogramaDiaSeleccinado=undefined;
  this.cronogramaJornadaSeleccinado=undefined;
  }
  openCronogramaDetalle(content, cronogramaDiaSeleccinado: ProgramaDias,cronogramaDetalleSeleccionado?:ProgramaDetalle ) {
    this.cronogramaDiaSeleccinado=cronogramaDiaSeleccinado;
    
    if(cronogramaDetalleSeleccionado!= undefined){
      this.cronogramaDetalleSeleccionado=cronogramaDetalleSeleccionado;
      this.cronogramaDetalleActividad=cronogramaDetalleSeleccionado.actividad;
      this.cronogramaDetalleHora=cronogramaDetalleSeleccionado.hora;
    }
    this.modalRef = this._modalService.open(content, { size: "lg" });
    this.modalRef.result.then(
      (result) => {
      this.resetVariablesCronogramaDetalle();
      },
      (reason) => {
        this.resetVariablesCronogramaDetalle();
      }
    );
  }
  guardarCronogramaDetalle(){
    if (this.cronogramaDetalleActividad != ""  && this.cronogramaDetalleHora!='') {
    const enviar = {
      hora:this.cronogramaDetalleHora,
      actividad:this.cronogramaDetalleActividad,
      dia_per:this.cronogramaDiaSeleccinado.id
    }
      if (this.cronogramaDetalleSeleccionado === undefined) {
        this._programaDetalleService
          .insertProgramaDetalle(enviar)
          .subscribe((result) => {
            this.getProgramaDetalle();
            this.cerrarModal();
          });
      } else {
        this._programaDetalleService
          .editProgramaDetalle(this.cronogramaDetalleSeleccionado.id,enviar)
          .subscribe((result) => {
            this.getProgramaDetalle();
            this.cerrarModal();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  eliminarCronogramaDetalle(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar detalle de cronograma?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._programaDetalleService
          .deleteProgramaDetalle(id)
          .subscribe((result) => {
            this.getProgramaDetalle();
          });
      } else {
      }
    });
  }
  guardarCronogramaDia(){
    if (this.cronogramaDiaFecha != ""  ) {
    
      if (this.cronogramaDiaSeleccinado === undefined) {
        const enviar = {
          fecha:this.cronogramaDiaFecha,
          jornada_per:this.cronogramaJornadaSeleccinado.id
        }
        this._programaDiasService
          .insertProgramaDias(enviar)
          .subscribe((result) => {
            this.getProgramaDias();
            this.cerrarModal();
          });
      } else {
        const enviar = {
          fecha:this.cronogramaDiaFecha
        }
        this._programaDiasService
          .editProgramaDias(this.cronogramaDiaSeleccinado.id,enviar)
          .subscribe((result) => {
            this.getProgramaDias();
            this.cerrarModal();
          });
      }
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }
  eliminarCronogramaDia(id: string) {
    Swal.fire({
      title: "Los datos se eliminaran permanentemente",
      text: "Eliminar el día de cronograma?",
      icon: "question",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        this._programaDiasService
          .deleteProgramaDias(id)
          .subscribe((result) => {
            this.getProgramaDias();
          });
      } else {
      }
    });
  }
}
