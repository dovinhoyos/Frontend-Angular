import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VentaService } from "app/Services/Venta/venta.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-form-venta",
  templateUrl: "./form-venta.component.html",
  styleUrls: ["./form-venta.component.scss"],
})
export class FormVentaComponent implements OnInit {
  ventaForm: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService,
    public dialogRef: MatDialogRef<FormVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number | null }
  ) {
    this.ventaForm = this.fb.group({
      idUsuario: ["", Validators.required],
      fechaVenta: ["", Validators.required],
      total: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.data.id;
    if (this.id) {
      this.cargarVenta(this.id);
    }
  }

  cargarVenta(id: number): void {
    this.ventaService.getVenta(id).subscribe({
      next: (data) => {
        if (data) {
          const { id_usuario, fecha_venta, total } = data;
          const fechaISO = new Date(fecha_venta)
            .toISOString()
            .substring(0, 10);
          this.ventaForm.patchValue({
            idUsuario: id_usuario,
            fechaVenta: fechaISO,
            total: total,
          });
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  guardarVenta(): void {
    if (this.ventaForm.valid) {
      if (this.id) {
        // Editar venta
        this.ventaService
          .updateVenta(this.id, this.ventaForm.value)
          .subscribe(() => {
            this.dialogRef.close(true);
          });
      } else {
        // Crear venta
        this.ventaService.addVenta(this.ventaForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
    console.log(this.ventaForm.value)
  }

  cancelar(): void {
    this.dialogRef.close(); // Cerrar el modal si se cancela la acción
  }
}
