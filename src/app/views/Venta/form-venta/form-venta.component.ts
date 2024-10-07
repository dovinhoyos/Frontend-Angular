import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VentaService } from 'app/Services/Venta/venta.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.component.html',
  styleUrls: ['./form-venta.component.scss']
})
export class FormVentaComponent implements OnInit {
  ventaForm: FormGroup;
  id: number | null = null;

  constructor(private fb: FormBuilder, private ventaService: VentaService, public dialogRef: MatDialogRef<FormVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number | null }) { 
      this.ventaForm = this.fb.group({
        idUsuario: ['', Validators.required],
        fechaVenta: ['', Validators.required],
        total: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.id = this.data.id;
    if (this.id) {
      this.cargarVenta(this.id);
    }
  }

  cargarVenta(id: number): void {
    this.ventaService.getVenta(id).subscribe(data => {
      this.ventaForm.patchValue(data);
    });
  }

  guardarVenta(): void {
    if (this.ventaForm.valid) {
      if (this.id) {
        // Editar producto
        this.ventaService.updateVenta(this.id, this.ventaForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        // Crear producto
        this.ventaService.addVenta(this.ventaForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  cancelar(): void {
    this.dialogRef.close(); // Cerrar el modal si se cancela la acción
  }

}
