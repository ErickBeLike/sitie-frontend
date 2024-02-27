import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InstalacionService } from '../../servicios/instalacion/instalacion.service';

@Component({
    selector: 'app-registro-instalacion',
    templateUrl: './registro-instalacion.component.html',
    styleUrls: ['./registro-instalacion.component.css']
})
export class RegistroInstalacionComponent implements OnInit {

    titulo = 'Agregar instalación';
    formInstalacion: FormGroup;
    id: any | null;
    botonGuardar: boolean = true;

    ventas: any[] = [];
    empleados: any[] = [];

    constructor(
        private fb: FormBuilder,
        private instalacionService: InstalacionService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formInstalacion = this.fb.group({
            id_venta: [null, Validators.required],
            id_responsable: [null, Validators.required],
            fecha_instalacion: [null, Validators.required],
        });

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.esEditar();
        this.cargarDatosIniciales(); 
    }

    cargarDatosIniciales() {
        this.instalacionService.obtenerVentas().subscribe(ventas => this.ventas = ventas || []);
        
        this.instalacionService.obtenerEmpleados().subscribe(empleados => this.empleados = empleados || []);
    }

    esEditar() {
        this.id = this.route.snapshot.paramMap.get('id'); 
        if (this.id !== null) {
            this.titulo = 'Editar instalación';
            this.instalacionService.buscarInstalacionPorId(this.id).subscribe(response => {
                if (response) {
                    this.formInstalacion.patchValue(response);
                } else {
                    console.error('No se encontraron datos para el ID proporcionado.');
                }
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
        this.instalacionService.agregarInstalacion(this.formInstalacion.value).subscribe(
            response => {
                this.router.navigate(['/instalacion/lista-instalacion']);
            },
            error => {
                console.error(error);
            }
        );
    }

    editar(id: any): void {
        const instalacion: any = this.formInstalacion.value;
        this.instalacionService.actualizarInstalacion(id, instalacion).subscribe(
            response => {
                this.router.navigate(['/instalacion/lista-instalacion']);
            },
            error => {
                console.error(error);
            }
        );
    }
}
