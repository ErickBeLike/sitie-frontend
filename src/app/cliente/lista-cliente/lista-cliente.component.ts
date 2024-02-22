import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../servicios/cliente/cliente.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {

  clientes: any[] = [];

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerTodosLosClientes();
  }

  obtenerTodosLosClientes() {
    this.clienteService.obtenerTodosLosClientes().subscribe(response => {
      this.clientes = response;
    }, error => {
      console.error(error);
    });
  }

  eliminar(cliente: any) {
    const confirmar = confirm(`¿Estás seguro de eliminar el cliente con ID ${cliente.id}?`);
    if (confirmar) {
      this.clienteService.eliminarCliente(cliente.id).subscribe(response => {
        this.obtenerTodosLosClientes();
      }, error => {
        console.error(error);
      });
    }
  }

  editarCliente(id: any): void {
    this.router.navigate(['/cliente/registro-cliente', id]);
  }
}
