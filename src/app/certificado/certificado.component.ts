import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  constructor() { }
  encontrado=false;
  ngOnInit(): void {
  }
  cambiarEncontrado(){
    this.encontrado=!this.encontrado;
  }
}
