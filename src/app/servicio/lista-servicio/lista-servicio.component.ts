import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../../servicios/servicio/servicio.service';  // Asegúrate de tener el servicio correcto

@Component({
  selector: 'app-lista-servicio',
  templateUrl: './lista-servicio.component.html',
  styleUrls: ['./lista-servicio.component.css']
})
export class ListaServicioComponent implements OnInit {

  servicios: any[] = [];

  constructor(private servicioService: ServicioService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerTodosLosServicios();
  }

  obtenerTodosLosServicios() {
    this.servicioService.obtenerTodosLosServicios().subscribe(response => {
      this.servicios = response;
    }, error => {
      console.error(error);
    });
  }

  eliminar(servicio: any) {
    const confirmar = confirm(`¿Estás seguro de eliminar el servicio con ID ${servicio.id}?`);
    if (confirmar) {
      this.servicioService.eliminarServicio(servicio.id).subscribe(response => {
        this.obtenerTodosLosServicios();
      }, error => {
        console.error(error);
      });
    }
  }

  editarServicio(id: any): void {
    this.router.navigate(['/servicio/registro-servicio', id]);
  }
}
