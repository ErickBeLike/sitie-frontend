import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private apiUrl = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) { }

  obtenerTodasLasVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarVentaId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarVenta(venta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, venta);
  }

  actualizarVenta(id: number, venta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, venta);
  }

  eliminarVenta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Métodos ficticios para obtener clientes, servicios y empleados
  obtenerClientes(): Observable<any[]> {
    const clientesUrl = 'http://localhost:8080/api/clientes'; // Reemplaza con la URL correcta
    return this.http.get<any[]>(clientesUrl);
  }

  obtenerServicios(): Observable<any[]> {
    const serviciosUrl = 'http://localhost:8080/api/servicios'; // Reemplaza con la URL correcta
    return this.http.get<any[]>(serviciosUrl);
  }

  obtenerEmpleados(): Observable<any[]> {
    const empleadosUrl = 'http://localhost:8080/api/empleados'; // Reemplaza con la URL correcta
    return this.http.get<any[]>(empleadosUrl);
  }
}
