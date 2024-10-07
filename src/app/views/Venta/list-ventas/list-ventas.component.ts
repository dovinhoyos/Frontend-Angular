import { Component, OnInit } from '@angular/core';
import { VentaService } from 'app/Services/Venta/venta.service';
import { FormVentaComponent } from '../form-venta/form-venta.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrls: ['./list-ventas.component.scss']
})
export class ListVentasComponent implements OnInit {

  ventas: any[] = [];

  constructor(private ventaService: VentaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarVentas();
  }

  listarVentas(): void {
    this.ventaService.getVentas().subscribe(data => this.ventas = data[0])
  }

  agregarVenta(): void {
    const dialogRef = this.dialog.open(FormVentaComponent, {
      width: '600px',
      data: { id: null }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listarVentas(); 
    });
  }

  actualizarVenta(id: number): void {
    const dialogRef = this.dialog.open(FormVentaComponent, {
      width: '600px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarVentas(); // Recargar la lista cuando se cierre el modal
    });
  }

  eliminarVenta(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.ventaService.deleteVenta(id).subscribe(() => {
        this.listarVentas(); // Recargar lista después de eliminar
      });
    }
  }

}
