import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  constructor() { }
  encontrado=false;
  ngOnInit(): void {
  }
  cambiarEncontrado(){
    this.encontrado=!this.encontrado;
  }
}
