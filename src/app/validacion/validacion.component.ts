import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ConfiguracionService } from "../services/configuracion.service";
import { InscripcionService } from "../services/inscripcion.service";
import { PersonasService } from "../services/personas.service";
@Component({
  selector: "app-validacion",
  templateUrl: "./validacion.component.html",
  styleUrls: ["./validacion.component.css"],
})
export class ValidacionComponent implements OnInit {
  nombre: string = "";
  file: File = null;
  textoImg: string = "Seleccionar archivo...";
  comprobanteDeposito: string = "";
  idPersona: string = null;
  mostrarMensaje: boolean = false;
  constructor(
    private inscripcionService: InscripcionService,
    private personaService: PersonasService,
    private router: Router,
    private configService: ConfiguracionService
  ) {}
  documentoIdentidad: string = "";
  encontrado: boolean = false;
  ngOnInit(): void {}
  cambiarEncontrado() {
    this.encontrado = !this.encontrado;
  }
  habiliar() {
    this.configService.getConf().subscribe((result) => {
      result.forEach((element) => {
        if (element.nombre === "Validación") {
          if (!element.estado) {
            this.router.navigate(["/acerca-de"]);
          }
        }
      });
    });
  }
  async buscarInscripcion() {
    if (this.documentoIdentidad.length != 0) {
      await this.personaService
        .getPersona(this.documentoIdentidad)
        .subscribe((result) => {
          this.nombre = result.nom_paterno + " " + result.ape_paterno;

          this.inscripcionService
            .getInscripcion(result.id)
            .subscribe((result) => {
              this.idPersona = result.id_per_pert;
              if (result.num_deposito != "") {
                this.incripcionExistente();
                this.comprobanteDeposito = result.num_deposito;
              }
            });
        });
      setTimeout(() => {
        if (this.idPersona === null) {
          this.mensaje("Error!", "Usted no se encuentra registado", "error");
        }
      }, 2000);
    }
  }
  mensaje(titulo: string, texto: string, icono: any) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: icono,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#7A1E19",
      iconColor: "#7A1E19",
      color: "#7A1E19",
    });
  }
  renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
    });
}
  onFileSelected(event) {
    this.file= this.renameFile(event.target.files[0],this.documentoIdentidad + '.jpg');
    if (this.file.name !== null && this.file.name != "") {
      if (this.file.size <= 2000000) {
        this.textoImg = this.file.name;
        
      } else {
        /* Mensaje archivo */
        this.textoImg = "Seleccionar archivo...";
        this.file = null;
      }
    } else {
      this.textoImg = "Seleccionar archivo...";
      this.file = null;
    }
  }
  enviarDatos() {
    if (this.file != null && this.comprobanteDeposito != "") {
      const fecha = new Date();
      const fechaenviar = {
        fecha_Registro_de_validacion: fecha.toString(),
      };
      var data = new FormData();
      data.append("num_deposito", this.comprobanteDeposito);
      data.append("foto_deposito", this.file);
      data.append(
        "Hora_Registro_Deposito",
        fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
      ); 
      this.inscripcionService
        .updateComprobante(this.idPersona, data)
        .subscribe(
          this.inscripcionService
            .editInscripcion(this.idPersona, fechaenviar)
            .subscribe(
              this.mensaje("Validación", "Registro actualizado", "success"),
              this.router.navigate(["/acerca-de"])
            )
        );
    } else {
      this.mostrarMensaje = true;
      setTimeout(() => {
        this.mostrarMensaje = false;
      }, 5000);
    }
  }

  incripcionExistente() {
    Swal.fire({
      title: "Usted ya subio su comprobante, desea continuar?",
      text: "¿Deceas editar los datos?",
      icon: "info",
      iconColor: "#7A1E19",
      color: "#7A1E19",
      showCancelButton: true,
      confirmButtonColor: "#7A1E19",
      cancelButtonColor: "#85929E",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.value) {
        console.log(result.value);
        this.cambiarEncontrado();
      } else {
        console.log(result.value);
        this.comprobanteDeposito = "";
      }
    });
  }
}
