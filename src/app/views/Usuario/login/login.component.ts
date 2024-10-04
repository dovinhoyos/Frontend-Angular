import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../Services/Usuario/login.service";
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false; 
  passwordFocused: boolean = false;
  user = {
    email: '',
    contrasena: ''
  };
  errorMessage: string = ''; 

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  backToHome() {
    this.router.navigate(['']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; 
  }

  onPasswordFocus() {
    this.passwordFocused = true;
  }

  onPasswordBlur() {
    this.passwordFocused = false;
  }

  onSubmit() {
    // Verifica si los campos están vacíos
    if (!this.user.email || !this.user.contrasena) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.loginService.iniciarSesion(this.user).subscribe(response => {
        console.log('Inicio de sesión exitoso', response);
        if (response) {
          this.router.navigate(['/Panel']);
        }
    }, error => {
      console.error('Error al iniciar sesión', error);
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = 'Usuario y Contraseña incorrectos';
      }
      console.log('Mensaje de error:', this.errorMessage);       
    });
  }

}
