import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario/usuario.service';

@Component({
    selector: 'app-registro-usuario',
    templateUrl: './registro-usuario.component.html',
    styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

    titulo = 'Agregar usuario';
    formUsuario: FormGroup;
    id: any | null;
    botonGuardar: boolean = true;

    constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formUsuario = this.fb.group({
            nombre_usuario: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
            correo: ['', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/)]],
            contrasena: ['', [Validators.required, Validators.minLength(8)]]
        });

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.esEditar();
    }

    esEditar() {
        if (this.id !== null) {
            this.titulo = 'Editar usuario';
            this.usuarioService.buscarUsuarioId(this.id).subscribe(response => {
                this.formUsuario.patchValue(response);
            });
        }
    }

    agregarOEditar(): void {
        if (this.id === null) {
            this.agregar();
        } else {
            this.editar(this.id);
        }
    }

    agregar(): void {
        this.usuarioService.agregarUsuario(this.formUsuario.value).subscribe(
            response => {
                this.router.navigate(['/usuario/lista-usuario']);
            },
            error => {
                console.error(error);
            }
        );
    }

    editar(id: any): void {
        const usuario: any = this.formUsuario.value;
        this.usuarioService.actualizarUsuario(id, usuario).subscribe(
            response => {
                this.router.navigate(['/usuario/lista-usuario']);
            },
            error => {
                console.error(error);
            }
        );
    }

    onInput(event: any) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); 
        this.formUsuario.get('nombre_usuario')?.setValue(newValue, { emitEvent: false });
    }
    
}
