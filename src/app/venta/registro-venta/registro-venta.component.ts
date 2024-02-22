import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VentaService } from '../../servicios/venta/venta.service';

@Component({
    selector: 'app-registro-venta',
    templateUrl: './registro-venta.component.html',
    styleUrls: ['./registro-venta.component.css']
})
export class RegistroVentaComponent implements OnInit {

    titulo = 'Agregar venta';
    formVenta: FormGroup;
    id: any | null;
    botonGuardar: boolean = true;

    clientes: any[] = [];
    servicios: any[] = [];
    empleados: any[] = [];

    constructor(
        private fb: FormBuilder,
        private ventaService: VentaService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formVenta = this.fb.group({
            id_cliente: [null, Validators.required],
            id_servicio: [null, Validators.required],
            id_responsable: [null, Validators.required],
        });

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.esEditar(); // Mover la carga de datos aquí para asegurarse de que se ejecute primero
        this.cargarDatosIniciales(); // Cargar datos iniciales en todos los casos
    }

    cargarDatosIniciales() {
        this.ventaService.obtenerClientes().subscribe(clientes => this.clientes = clientes || []);
        this.ventaService.obtenerServicios().subscribe(servicios => this.servicios = servicios || []);
        this.ventaService.obtenerEmpleados().subscribe(empleados => this.empleados = empleados || []);
    }

    esEditar() {
        this.id = this.route.snapshot.paramMap.get('id');  // Vuelve a obtener el ID para asegurarte de tener el valor actualizado
        if (this.id !== null) {
            this.titulo = 'Editar venta';
            this.ventaService.buscarVentaId(this.id).subscribe(response => {
                if (response) {
                    this.formVenta.patchValue(response);
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
        this.ventaService.agregarVenta(this.formVenta.value).subscribe(
            response => {
                this.router.navigate(['/venta/lista-venta']);
            },
            error => {
                console.error(error);
            }
        );
    }

    editar(id: any): void {
        const venta: any = this.formVenta.value;
        this.ventaService.actualizarVenta(id, venta).subscribe(
            response => {
                this.router.navigate(['/venta/lista-venta']);
            },
            error => {
                console.error(error);
            }
        );
    }
}
