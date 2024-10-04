import { Injectable  , EventEmitter   } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  
  private baseUrl = environment.apiUrl;
  loginStatusChanged = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService,   private router: Router) { }

 

registrarUsuario(formData: FormData, ): Observable<any> {
  return this.httpClient.post(`${this.baseUrl}crearUsuario`, formData);
}


listarUsuarios(): Observable<any> {
  const url = `${this.baseUrl}listUsuarios`; 
  return this.httpClient.get<any>(url);
}
iniciarSesion(formValue: any): Observable<any> {
  const url = `${this.baseUrl}login`;
  return this.httpClient.post<any>(url, formValue).pipe(
    map(response => {
      if (response.token) {
        localStorage.setItem('token', response.token); 
        localStorage.setItem('id', response.user.id)
        localStorage.setItem('identificacion', response.token)
      }

      console.log('token:', localStorage)
     
        this.loginStatusChanged.emit(true);
      return response;
    })
  );
}
isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  return token !== null && !this.jwtHelper.isTokenExpired(token);
}

}
