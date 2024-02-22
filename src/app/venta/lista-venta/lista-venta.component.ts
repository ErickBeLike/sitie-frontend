import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from '../../servicios/venta/venta.service'; // Asegúrate de importar el servicio correcto

@Component({
  selector: 'app-lista-venta', // Cambiado el nombre del selector
  templateUrl: './lista-venta.component.html', // Cambiado el nombre del archivo HTML
  styleUrls: ['./lista-venta.component.css'] // Cambiado el nombre del archivo de estilos
})
export class ListaVentaComponent implements OnInit {

  ventas: any[] = []; // Cambiado el nombre de la propiedad

  constructor(private ventaService: VentaService, private router: Router) {} // Cambiado el nombre del servicio

  ngOnInit(): void {
    this.obtenerTodasLasVentas(); // Cambiado el nombre del método
  }

  obtenerTodasLasVentas() { // Cambiado el nombre del método
    this.ventaService.obtenerTodasLasVentas().subscribe(response => { // Cambiado el nombre del método en el servicio
      this.ventas = response;
    }, error => {
      console.error(error);
    });
  }

  eliminarVenta(venta: any) { // Cambiado el nombre del método y el parámetro
    const confirmar = confirm(`¿Estás seguro de eliminar la venta con ID ${venta.id}?`); // Cambiado el nombre de las propiedades
    if (confirmar) {
      this.ventaService.eliminarVenta(venta.id).subscribe(response => { // Cambiado el nombre del método en el servicio
        this.obtenerTodasLasVentas(); // Cambiado el nombre del método
      }, error => {
        console.error(error);
      });
    }
  }

  editarVenta(id: any): void { // Cambiado el nombre del método y el parámetro
    this.router.navigate(['/venta/registro-venta', id]); // Cambiado el nombre de la ruta
  }
}
