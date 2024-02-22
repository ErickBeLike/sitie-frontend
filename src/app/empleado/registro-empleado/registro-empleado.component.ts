import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../servicios/empleado/empleado.service';

@Component({
    selector: 'app-registro-empleado',
    templateUrl: './registro-empleado.component.html',
    styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {

    titulo = 'Agregar empleado';
    formEmpleado: FormGroup;
    id: any | null;
    botonGuardar: boolean = true;

    constructor(
        private fb: FormBuilder,
        private empleadoService: EmpleadoService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formEmpleado = this.fb.group({
            nombre_empleado: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
            rol_empleado: ['', [Validators.required]],
            telefono_empleado: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
            correo_empleado: ['', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/)]]
        });

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.esEditar();
    }

    esEditar() {
        if (this.id !== null) {
            this.titulo = 'Editar empleado';
            this.empleadoService.buscarEmpleadoId(this.id).subscribe(response => {
                this.formEmpleado.patchValue(response);
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
        this.empleadoService.agregarEmpleado(this.formEmpleado.value).subscribe(
            response => {
                this.router.navigate(['/empleado/lista-empleado']);
            },
            error => {
                console.error(error);
            }
        );
    }

    editar(id: any): void {
        const empleado: any = this.formEmpleado.value;
        this.empleadoService.actualizarEmpleado(id, empleado).subscribe(
            response => {
                this.router.navigate(['/empleado/lista-empleado']);
            },
            error => {
                console.error(error);
            }
        );
    }

    onInput(event: any) {
      const inputValue = event.target.value;
      const newValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); 
      this.formEmpleado.get('nombre_empleado')?.setValue(newValue, { emitEvent: false });
  }  

  onInputRol(event: any) {
    const inputValue = event.target.value;
    const newValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); 
    this.formEmpleado.get('rol_empleado')?.setValue(newValue, { emitEvent: false });
}  

    onTelefonoInput(event: any) {
      const inputValue = event.target.value;
      const newValue = inputValue.replace(/[^0-9]/g, '');
      this.formEmpleado.get('telefono_empleado')?.setValue(newValue, { emitEvent: false });
  }
  
}
