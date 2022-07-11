import { Routes } from '@angular/router';



import { CertificadoComponent } from '../../certificado/certificado.component';
import { RegistroComponent } from '../../registro/registro.component';
import { AcercaDeComponent } from '../../acerca-de/acerca-de.component'; 
import { FacturacionComponent } from '../../facturacion/facturacion.component';
import { ValidacionComponent } from '../../validacion/validacion.component';


export const AdminLayoutRoutes: Routes = [
     
     { path: 'acerca-de', component: AcercaDeComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'certificado', component: CertificadoComponent },
    { path: 'facturacion', component: FacturacionComponent }, 
    { path: 'validacion', component: ValidacionComponent },
];
