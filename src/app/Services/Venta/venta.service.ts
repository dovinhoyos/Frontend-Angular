import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getVentas(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseUrl}obtenerVentas`);
  }

  getVenta(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}obtenerVentas/${id}`);
  }

  addVenta(venta: any): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}crearVenta`, venta);
  }

  updateVenta(id: number, producto: any): Observable<any> {
    const body = { id, ...producto };  // Incluimos el id en el body
    return this.httpClient.put<any>(`${this.baseUrl}actualizarVenta`, body);  // Ya no pasamos el id en la URL
  }
  
  deleteVenta(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}eliminarVenta/${id}`);
  }
}
