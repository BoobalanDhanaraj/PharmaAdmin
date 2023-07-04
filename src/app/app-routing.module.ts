import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { RouteGuards } from './services/RouteGuardsService';

const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  {
    path: 'admindashboard',
    component: ProductDashboardComponent,
    canActivate: [RouteGuards],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
