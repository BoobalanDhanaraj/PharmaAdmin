import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { product } from '../models/product-dashboard';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  AdminLogin(id: any, AdminFormData: any) {
    return this.http
      .post('https://localhost:7027/api/Login/' + id, AdminFormData)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postProducts(data: any) {
    return this.http
      .post<any>('https://localhost:7027/api/Products', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getProducts() {
    return this.http.get<product>('https://localhost:7027/api/Products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteProducts(id: number) {
    return this.http
      .delete<any>('https://localhost:7027/api/Products/' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  editProducts(productModelObj: any, id: number) {
    return this.http
      .put('https://localhost:7027/api/Products/' + id, productModelObj)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getProductDetails(id: any) {
    return this.http.get('https://localhost:7027/api/Products/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
