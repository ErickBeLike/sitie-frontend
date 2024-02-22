import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ListaClienteComponent } from './cliente/lista-cliente/lista-cliente.component';
import { RegistroClienteComponent } from './cliente/registro-cliente/registro-cliente.component';
import { ListaUsuarioComponent } from './usuario/lista-usuario/lista-usuario.component';
import { RegistroUsuarioComponent } from './usuario/registro-usuario/registro-usuario.component';
import { ListaServicioComponent } from './servicio/lista-servicio/lista-servicio.component';
import { RegistroServicioComponent } from './servicio/registro-servicio/registro-servicio.component';
import { ListaVentaComponent } from './venta/lista-venta/lista-venta.component';
import { RegistroVentaComponent } from './venta/registro-venta/registro-venta.component';
import { ListaInstalacionComponent } from './instalacion/lista-instalacion/lista-instalacion.component';
import { RegistroInstalacionComponent } from './instalacion/registro-instalacion/registro-instalacion.component';
import { ListaEmpleadoComponent } from './empleado/lista-empleado/lista-empleado.component';
import { RegistroEmpleadoComponent } from './empleado/registro-empleado/registro-empleado.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    ListaClienteComponent,
    RegistroClienteComponent,
    ListaUsuarioComponent,
    RegistroUsuarioComponent,
    ListaServicioComponent,
    RegistroServicioComponent,
    ListaVentaComponent,
    RegistroVentaComponent,
    ListaInstalacionComponent,
    RegistroInstalacionComponent,
    ListaEmpleadoComponent,
    RegistroEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
