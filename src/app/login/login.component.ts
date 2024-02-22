import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    correo: '',
    contrasena: '',
  };

  error: string = ''; 

  constructor(private loginService: LoginService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const disableBack = navigation.extras.state['disableBack'];
      if (disableBack) {
        history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
          history.pushState(null, '', window.location.href);
        };
      }
    }
  }

  login() {
    this.loginService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login exitoso', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error en el inicio de sesión', error);
        this.error = 'Credenciales inválidas';
      }
    );
  }
}
