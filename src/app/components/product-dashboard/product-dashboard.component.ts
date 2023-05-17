import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product-dashboard';
import { ApiService } from 'src/app/services/api.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css'],
})
export class ProductDashboardComponent implements OnInit {
  admin!: Admin[];
  formValue!: FormGroup;
  productsList: Product[] = [];
  productModelObj: Product = new Product();
  showAdd: boolean = false;
  showUpdate: boolean = false;
  productDetail!: Product;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      ProductName: [''],
      MfdDate: [''],
      ExpDate: [''],
      ProductImg: [''],
      Price: [''],
      Stock: [''],
    });

    this.getProducts();
  }

  getProducts() {
    this.api.getProducts().subscribe((res) => {
      console.log(res);
      this.productsList = res;
      console.log(this.productsList.values);
    });
  }

  clickAddProducts() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postProductDetails() {
    this.productModelObj.productId = 0;
    this.productModelObj.productName = this.formValue.value.ProductName;
    this.productModelObj.mfdDate = this.formValue.value.MfdDate;
    this.productModelObj.expDate = this.formValue.value.ExpDate;
    this.productModelObj.ProductImg = this.formValue.value.ProductImg;
    this.productModelObj.price = this.formValue.value.Price;
    this.productModelObj.stock = this.formValue.value.Stock;

    this.api.postProducts(this.productModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Product added successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getProducts();
      },
      (err) => {
        console.log(err);
        alert('Something Went wrong');
      }
    );
  }

  updateProductDetails() {
    this.productModelObj.productName = this.formValue.value.ProductName;
    this.productModelObj.mfdDate = this.formValue.value.MfdDate;
    this.productModelObj.expDate = this.formValue.value.ExpDate;
    this.productModelObj.ProductImg = this.formValue.value.ProductImg;
    this.productModelObj.price = this.formValue.value.Price;
    this.productModelObj.stock = this.formValue.value.Stock;
    this.api
      .editProducts(this.productModelObj, this.productModelObj.productId)
      .subscribe((res) => {
        console.log(res);
        this.formValue.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        alert('Product Updated');

        this.getProducts();
      });
  }

  clickEditProducts() {
    this.showAdd = false;
    this.showUpdate = true;
  }

  deleteProducts(product: any) {
    this.api.deleteProducts(product.productId).subscribe((res) => {
      alert('Product Deleted');
      this.getProducts();
    });
  }

  onEdit(product: any) {
    this.productModelObj.productId = product.productId;
    this.formValue.controls['ProductName'].setValue(product.productName);
    this.formValue.controls['MfdDate'].setValue(product.mfdDate);
    this.formValue.controls['ExpDate'].setValue(product.expDate);
    this.formValue.controls['ProductImg'].setValue(product.productImg);
    this.formValue.controls['Price'].setValue(product.price);
    this.formValue.controls['Stock'].setValue(product.stock);
  }
}
