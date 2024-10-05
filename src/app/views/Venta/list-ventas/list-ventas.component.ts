import { Component, OnInit } from '@angular/core';
import { VentaService } from 'app/Services/Venta/venta.service';

@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrls: ['./list-ventas.component.scss']
})
export class ListVentasComponent implements OnInit {

  ventas: any[] = [];

  constructor(private ventaService: VentaService) { }

  ngOnInit(): void {
    this.listarVentas();
  }

  listarVentas(): void {
    this.ventaService.getVentas().subscribe(data => this.ventas = data[0])
  }

  eliminarVenta(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.ventaService.deleteVenta(id).subscribe(() => {
        this.listarVentas(); // Recargar lista después de eliminar
      });
    }
  }

}
