import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from '../app/views/Usuario/login/login.component'
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import {AuthInterceptor} from './Services/Usuario/auth.interceptor';
import {LoginService} from './Services/Usuario/login.service';
import { ListVentasComponent } from './views/Venta/list-ventas/list-ventas.component';
import { FormVentaComponent } from './views/Venta/form-venta/form-venta.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ListVentasComponent,
    FormVentaComponent
  ],
  providers: [
    JwtHelperService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
