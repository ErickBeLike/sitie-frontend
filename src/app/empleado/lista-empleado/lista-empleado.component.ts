import { Component } from '@angular/core';
import { EmpleadoService } from '../../servicios/empleado/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empleado',
  templateUrl: './lista-empleado.component.html',
  styleUrl: './lista-empleado.component.css'
})
export class ListaEmpleadoComponent {
  empleados: any[] = [];

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerTodosLosEmpleados();
  }

  obtenerTodosLosEmpleados() {
    this.empleadoService.obtenerTodosLosEmpleados().subscribe(response => {
      this.empleados = response;
    }, error => {
      console.error(error);
    });
  }

  eliminar(empleado: any) {
    const confirmar = confirm(`¿Estás seguro de eliminar el empleado con ID ${empleado.id}?`);
    if (confirmar) {
      this.empleadoService.eliminarEmpleado(empleado.id).subscribe(response => {
        this.obtenerTodosLosEmpleados();
      }, error => {
        console.error(error);
      });
    }
  }

  editarEmpleado(id: any): void {
    this.router.navigate(['/empleado/registro-empleado', id]);
  }
}
