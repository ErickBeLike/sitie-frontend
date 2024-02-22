import { Component } from '@angular/core';
import { LoginService } from '../servicios/login/login.service';
import { Router } from '@angular/router';

LoginService

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private loginService: LoginService, private router: Router) {}


  logout(): void {
    this.loginService.logout().subscribe(
      () => {
        console.log('Sesión cerrada correctamente');
        this.router.navigate(['login'], { replaceUrl: true });
      },
      (error) => {
        console.error('Error al cerrar sesión', error);
      }
    );
  }

}
