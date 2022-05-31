import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { AdministracionComponent } from './administracion.component';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './administracion.routing';
import { TableroComponent } from './tablero/tablero.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ /* AdministracionComponent */],
  imports: [
    CommonModule,
    NgbNavModule,
  ],
  exports: [
    
  ]
})
export class AdministracionModule { }
