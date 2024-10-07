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

  updateVenta(id: number, venta: any): Observable<any> {  
    return this.httpClient.put<any>(`${this.baseUrl}actualizarVenta/${id}`, venta); 
  }
  
  deleteVenta(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}eliminarVenta/${id}`);
  }
}
