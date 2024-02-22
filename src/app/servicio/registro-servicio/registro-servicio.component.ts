import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioService } from '../../servicios/servicio/servicio.service';

@Component({
    selector: 'app-registro-servicio',
    templateUrl: './registro-servicio.component.html',
    styleUrls: ['./registro-servicio.component.css']
})
export class RegistroServicioComponent implements OnInit {

    titulo = 'Agregar servicio';
    formServicio: FormGroup;
    id: any | null;
    botonGuardar: boolean = true;

    constructor(
        private fb: FormBuilder,
        private servicioService: ServicioService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formServicio = this.fb.group({
            nombre_servicio: ['', [Validators.required]],
            precio_servicio: [0, [Validators.required]],
            descricion: ['', [Validators.required]]
        });

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.esEditar();
    }

    esEditar() {
        if (this.id !== null) {
            this.titulo = 'Editar servicio';
            this.servicioService.buscarServicioId(this.id).subscribe(response => {
                this.formServicio.patchValue(response);
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
        this.servicioService.agregarServicio(this.formServicio.value).subscribe(
            response => {
                this.router.navigate(['/servicio/lista-servicio']);
            },
            error => {
                console.error(error);
            }
        );
    }

    editar(id: any): void {
        const servicio: any = this.formServicio.value;
        this.servicioService.actualizarServicio(id, servicio).subscribe(
            response => {
                this.router.navigate(['/servicio/lista-servicio']);
            },
            error => {
                console.error(error);
            }
        );
    }

    onInput(event: any) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); 
        this.formServicio.get('nombre_servicio')?.setValue(newValue, { emitEvent: false });
    }
}
