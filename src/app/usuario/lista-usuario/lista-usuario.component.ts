import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario/usuario.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerTodosLosUsuarios();
  }

  obtenerTodosLosUsuarios() {
    this.usuarioService.obtenerTodosLosUsuario().subscribe(response => {
      this.usuarios = response;
    }, error => {
      console.error(error);
    });
  }

  eliminar(usuario: any) {
    const confirmar = confirm(`¿Estás seguro de eliminar el usuario con ID ${usuario.id}?`);
    if (confirmar) {
      this.usuarioService.eliminarUsuario(usuario.id).subscribe(response => {
        this.obtenerTodosLosUsuarios();
      }, error => {
        console.error(error);
      });
    }
  }

  editarUsuario(id: any): void {
    this.router.navigate(['/usuario/registro-usuario', id]);
  }
}
