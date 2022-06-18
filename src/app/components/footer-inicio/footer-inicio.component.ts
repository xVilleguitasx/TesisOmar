import { Component, OnInit } from '@angular/core';
import { Patrocinador } from '../../../app/models/patrocinador.model';
import { PatrocinadoresService } from '../../../app/services/patrocinadores.service';

@Component({
  selector: 'app-footer-inicio',
  templateUrl: './footer-inicio.component.html',
  styleUrls: ['./footer-inicio.component.css']
})
export class FooterInicioComponent implements OnInit {
  patrocinadores: Patrocinador[]=[];
  constructor(
    private patrocinadoresService: PatrocinadoresService
  ) { }

  urlglobal:string='./assets/patrocinadores/'
  imagenes:string[] = [this.urlglobal+'aisti.png',this.urlglobal+'cedia.png',this.urlglobal+'cit.png',this.urlglobal+'dide.png',this.urlglobal+'rtc redu.png',this.urlglobal+'springer.png'];
  urlglobarlredessociales = './assets/redes-sociales/'
  redessociales:string[]=[this.urlglobarlredessociales+'facebook.png',this.urlglobarlredessociales+'instagram.png',this.urlglobarlredessociales+'linkedin.png',this.urlglobarlredessociales+'twitter.png',this.urlglobarlredessociales+'whatsapp.png'];
  ngOnInit(): void {
    this.getPatrocinadores();
  }
  getPatrocinadores(){
    this.patrocinadoresService.getPatrocinadores().subscribe((result)=>{
      this.patrocinadores= result.filter(element=> element.estado);
    })
  }
  openPatrocinador(link:string){
    window.open(link, '_blank');
  }

}
