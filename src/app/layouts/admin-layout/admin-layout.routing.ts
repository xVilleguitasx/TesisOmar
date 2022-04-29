import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

import { CertificadoComponent } from '../../certificado/certificado.component';
import { RegistroComponent } from '../../registro/registro.component';
import { AcercaDeComponent } from '../../acerca-de/acerca-de.component'; 
import { FacturacionComponent } from '../../facturacion/facturacion.component';
import { ValidacionComponent } from '../../validacion/validacion.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent }, 
     { path: 'acerca-de', component: AcercaDeComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'certificado', component: CertificadoComponent },
    { path: 'facturacion', component: FacturacionComponent }, 
    { path: 'validacion', component: ValidacionComponent },
];
