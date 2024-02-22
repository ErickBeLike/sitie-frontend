import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstalacionService } from '../../servicios/instalacion/instalacion.service'; // Asegúrate de importar el servicio correcto

@Component({
  selector: 'app-lista-instalacion', // Cambiado el nombre del selector
  templateUrl: './lista-instalacion.component.html', // Cambiado el nombre del archivo HTML
  styleUrls: ['./lista-instalacion.component.css'] // Cambiado el nombre del archivo de estilos
})
export class ListaInstalacionComponent implements OnInit {

  instalaciones: any[] = []; // Cambiado el nombre de la propiedad

  constructor(private instalacionService: InstalacionService, private router: Router) {} // Cambiado el nombre del servicio

  ngOnInit(): void {
    this.obtenerTodasLasInstalaciones(); // Cambiado el nombre del método
  }

  obtenerTodasLasInstalaciones() { // Cambiado el nombre del método
    this.instalacionService.obtenerTodasLasInstalaciones().subscribe(response => { // Cambiado el nombre del método en el servicio
      this.instalaciones = response;
    }, error => {
      console.error(error);
    });
  }

  eliminarInstalacion(instalacion: any) { // Cambiado el nombre del método y el parámetro
    const confirmar = confirm(`¿Estás seguro de eliminar la instalación con ID ${instalacion.id}?`); // Cambiado el nombre de las propiedades
    if (confirmar) {
      this.instalacionService.eliminarInstalacion(instalacion.id).subscribe(response => { // Cambiado el nombre del método en el servicio
        this.obtenerTodasLasInstalaciones(); // Cambiado el nombre del método
      }, error => {
        console.error(error);
      });
    }
  }

  editarInstalacion(id: any): void { // Cambiado el nombre del método y el parámetro
    this.router.navigate(['/instalacion/registro-instalacion', id]); // Cambiado el nombre de la ruta
  }
}
