import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../servicios/cliente/cliente.service';

@Component({
    selector: 'app-registro-cliente',
    templateUrl: './registro-cliente.component.html',
    styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

    titulo = 'Agregar cliente';
    formCliente: FormGroup;
    id: any | null;
    botonGuardar: boolean = true;

    constructor(
        private fb: FormBuilder,
        private clienteService: ClienteService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formCliente = this.fb.group({
            nombre_cliente: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
            correo_cliente: ['', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/)]],
            telefono_cliente: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            direccion: ['', Validators.required]
        });

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.esEditar();
    }

    esEditar() {
        if (this.id !== null) {
            this.titulo = 'Editar cliente';
            this.clienteService.buscarClienteId(this.id).subscribe(response => {
                this.formCliente.patchValue(response);
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
        this.clienteService.agregarCliente(this.formCliente.value).subscribe(
            response => {
                this.router.navigate(['/cliente/lista-cliente']);
            },
            error => {
                console.error(error);
            }
        );
    }

    editar(id: any): void {
        const cliente: any = this.formCliente.value;
        this.clienteService.actualizarCliente(id, cliente).subscribe(
            response => {
                this.router.navigate(['/cliente/lista-cliente']);
            },
            error => {
                console.error(error);
            }
        );
    }

    onInput(event: any) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); 
        this.formCliente.get('nombre_cliente')?.setValue(newValue, { emitEvent: false });
    }
    

    onTelefonoInput(event: any) {
      const inputValue = event.target.value;
      const newValue = inputValue.replace(/[^0-9]/g, ''); // Elimina todo excepto números
      this.formCliente.get('telefono_cliente')?.setValue(newValue, { emitEvent: false });
  }
  
}
