import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaClienteComponent } from './cliente/lista-cliente/lista-cliente.component';
import { RegistroClienteComponent } from './cliente/registro-cliente/registro-cliente.component';

import { ListaEmpleadoComponent } from './empleado/lista-empleado/lista-empleado.component';
import { RegistroEmpleadoComponent } from './empleado/registro-empleado/registro-empleado.component';

import { ListaUsuarioComponent } from './usuario/lista-usuario/lista-usuario.component';
import { RegistroUsuarioComponent } from './usuario/registro-usuario/registro-usuario.component';

import { ListaServicioComponent } from './servicio/lista-servicio/lista-servicio.component';
import { RegistroServicioComponent } from './servicio/registro-servicio/registro-servicio.component';

import { ListaVentaComponent } from './venta/lista-venta/lista-venta.component';
import { RegistroVentaComponent } from './venta/registro-venta/registro-venta.component';

import { ListaInstalacionComponent } from './instalacion/lista-instalacion/lista-instalacion.component';
import { RegistroInstalacionComponent } from './instalacion/registro-instalacion/registro-instalacion.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },


  // Cliente
  {
    path: 'cliente/lista-cliente',
    component: ListaClienteComponent
  },
  {
    path: 'cliente/registro-cliente',
    component: RegistroClienteComponent
  },
  {
    path: 'cliente/registro-cliente/:id',
    component: RegistroClienteComponent
  },


  // Usuario
  {
    path: 'usuario/lista-usuario',
    component: ListaUsuarioComponent
  },
  {
    path: 'usuario/registro-usuario',
    component: RegistroUsuarioComponent
  },
  {
    path: 'usuario/registro-usuario/:id',
    component: RegistroUsuarioComponent
  },

  // Empleado
  {
    path: 'empleado/lista-empleado',
    component: ListaEmpleadoComponent
  },
  {
    path: 'empleado/registro-empleado',
    component: RegistroEmpleadoComponent
  },
  {
    path: 'empleado/registro-empleado/:id',
    component: RegistroEmpleadoComponent
  },

  // Servicio
  {
    path: 'servicio/lista-servicio',
    component: ListaServicioComponent
  },
  {
    path: 'servicio/registro-servicio',
    component: RegistroServicioComponent
  },
  {
    path: 'servicio/registro-servicio/:id',
    component: RegistroServicioComponent
  },


  // Venta
  {
    path: 'venta/lista-venta',
    component: ListaVentaComponent
  },
  {
    path: 'venta/registro-venta',
    component: RegistroVentaComponent
  },
  {
    path: 'venta/registro-venta/:id',
    component: RegistroVentaComponent
  },


  // Instalacion
  {
    path: 'instalacion/lista-instalacion',
    component: ListaInstalacionComponent
  },
  {
    path: 'instalacion/registro-instalacion',
    component: RegistroInstalacionComponent
  },
  {
    path: 'instalacion/registro-instalacion/:id',
    component: RegistroInstalacionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
