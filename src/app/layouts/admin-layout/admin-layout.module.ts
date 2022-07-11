import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AcercaDeComponent } from '../../acerca-de/acerca-de.component';
import { RegistroComponent } from '../../registro/registro.component';
import { CertificadoComponent } from '../../certificado/certificado.component';
import { FacturacionComponent } from '../../facturacion/facturacion.component';
import { ValidacionComponent } from '../../validacion/validacion.component';

@NgModule({ 
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
  
    AcercaDeComponent,
    RegistroComponent,
    CertificadoComponent,
    FacturacionComponent,
    ValidacionComponent,
  ]
})

export class AdminLayoutModule {}
