import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {

  private apiUrl = 'http://localhost:8080/api/instalaciones';
  private ventasUrl = 'http://localhost:8080/api/ventas';
  private empleadosUrl = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient) { }

  obtenerTodasLasInstalaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarInstalacionPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarInstalacion(instalacion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, instalacion);
  }

  actualizarInstalacion(id: number, instalacion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, instalacion);
  }

  eliminarInstalacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Agrega el método para obtener la lista de ventas
  obtenerVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.ventasUrl);
  }

  // Agrega el método para obtener la lista de empleados
  obtenerEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.empleadosUrl);
  }
}
