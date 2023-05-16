import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgToastModule } from 'ng-angular-popup';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DropdownDirectives } from './helpers/dropdown-directive';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { RouteGuards } from './services/RouteGuardsService';

@NgModule({
  declarations: [AppComponent, AdminLoginComponent, DropdownDirectives],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule,
    HttpClientModule,
  ],
  providers: [AuthService, ApiService, RouteGuards],
  bootstrap: [AppComponent],
})
export class AppModule {}
