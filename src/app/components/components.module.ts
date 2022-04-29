import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SlidebarAdminComponent } from './slidebar-admin/slidebar-admin.component';
import { HeaderInicioComponent } from './header-inicio/header-inicio.component';
import { FooterInicioComponent } from './footer-inicio/footer-inicio.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule 
    
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SlidebarAdminComponent,
    HeaderInicioComponent,
    FooterInicioComponent,
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SlidebarAdminComponent,
    HeaderInicioComponent,
    FooterInicioComponent,
    
  ]
})
export class ComponentsModule { }
