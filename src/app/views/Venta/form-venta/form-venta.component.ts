import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VentaService } from 'app/Services/Venta/venta.service';

@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.component.html',
  styleUrls: ['./form-venta.component.scss']
})
export class FormVentaComponent implements OnInit {
  ventaForm: FormGroup;
  id: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private ventaService: VentaService) { 
      this.ventaForm = this.fb.group({
        idUsuario: ['', Validators.required],
        total: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id') : null;
    if (this.id) {
      this.cargarProducto(this.id);
    }
  }

  cargarProducto(id: number): void {
    this.ventaService.getVenta(id).subscribe(data => {
      this.ventaForm.patchValue(data);
    });
  }

  guardarVenta(): void {
    if (this.ventaForm.valid) {
      if (this.id) {
        // Editar producto
        this.ventaService.updateVenta(this.id, this.ventaForm.value).subscribe(() => {
          this.router.navigate(['/ventas-list']);
        });
      } else {
        // Crear producto
        this.ventaService.addVenta(this.ventaForm.value).subscribe(() => {
          this.router.navigate(['/ventas-list']);
        });
      }
    }
  }

}
