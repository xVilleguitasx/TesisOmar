import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ValidacionAdminComponent } from "./validacion-admin/validacion-admin.component";
import { AdministracionComponent } from "./administracion/administracion.component";
import { InicioComponent } from "./inicio/inicio.component";
import { TableroComponent } from "./administracion/tablero/tablero.component";
import { ChartsModule } from 'ng2-charts';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    PdfViewerModule,
    ChartsModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ValidacionAdminComponent,
    AdministracionComponent,
    InicioComponent,
    TableroComponent,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
