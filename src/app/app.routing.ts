import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { TableroComponent } from './administracion/tablero/tablero.component';
import { InicioComponent } from './inicio/inicio.component';
import { CheckLoginGuard } from './services/guards/check.login.guard';
import { LogOutGuard } from './services/guards/log-out.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdministracionComponent,
    canActivate:[CheckLoginGuard]
   
  },
  {
    path: 'inicio',
    component: InicioComponent,
   
  },
  { path: 'admin/tablero', component: TableroComponent, canActivate:[LogOutGuard], },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
