import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from '../../servicios/venta/venta.service'; 

@Component({
  selector: 'app-lista-venta',
  templateUrl: './lista-venta.component.html', 
  styleUrls: ['./lista-venta.component.css'] 
})
export class ListaVentaComponent implements OnInit {

  ventas: any[] = []; 

  constructor(private ventaService: VentaService, private router: Router) {} 

  ngOnInit(): void {
    this.obtenerTodasLasVentas(); 
  }

  obtenerTodasLasVentas() { 
    this.ventaService.obtenerTodasLasVentas().subscribe(response => { 
      this.ventas = response;
    }, error => {
      console.error(error);
    });
  }

  eliminarVenta(venta: any) { 
    const confirmar = confirm(`¿Estás seguro de eliminar la venta con ID ${venta.id}?`); 
    if (confirmar) {
      this.ventaService.eliminarVenta(venta.id).subscribe(response => { 
        this.obtenerTodasLasVentas(); 
      }, error => {
        console.error(error);
      });
    }
  }

  editarVenta(id: any): void { 
    this.router.navigate(['/venta/registro-venta', id]); 
  }
}
