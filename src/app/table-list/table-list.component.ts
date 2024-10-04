import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/Services/Usuario/login.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.loginService.listarUsuarios().subscribe(
      response => {
        this.usuarios = response.data || [];
        console.log('Usuarios:', this.usuarios);
      },
      error => {
        console.error('Error al fo la lista de usuarios:', error);
      }
    );
  }
}
