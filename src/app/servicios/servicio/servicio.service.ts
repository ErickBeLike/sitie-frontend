import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private apiUrl = 'http://localhost:8080/api/servicios';

  constructor(private http: HttpClient) { }

  obtenerTodosLosServicios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarServicioId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarServicio(servicio: any): Observable<any> {
    console.log('Valor del precio en el servicio:', servicio.precio_servicio);
    return this.http.post<any>(this.apiUrl, servicio);
}


  actualizarServicio(id: number, servicio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, servicio);
  }

  eliminarServicio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
