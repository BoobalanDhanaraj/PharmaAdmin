import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private route: Router,
    private toast: NgToastService
  ) {}
  AdminLoginForm!: FormGroup;
  id!: string;
  AdminObj: Admin = {
    AdminMail: '',
    AdminPassword: '',
  };

  AdminAuthenticator!: Admin;
  ngOnInit(): void {
    document.body.className = 'selector';
    this.AdminLoginForm = this.fb.group({
      AdminId: ['', Validators.required],
      AdminPassword: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    document.body.className = '';
  }

  onAdminLogin() {
    console.log(this.AdminLoginForm);
    this.id = this.AdminLoginForm.value.AdminId;
    this.AdminObj.AdminMail = this.AdminLoginForm.value.AdminId;
    this.AdminObj.AdminPassword = this.AdminLoginForm.value.AdminPassword;
    this.api.AdminLogin(this.id, this.AdminObj).subscribe(
      (res) => {
        this.AdminAuthenticator = res;
        console.log(this.AdminAuthenticator);
        if (res != null) {
          this.auth.login();
          this.toast.success({
            detail: 'Success',
            summary: 'Login success',
            sticky: true,
            position: 'tc',
          });
          this.route.navigate(['/admindashboard']);
          this.AdminLoginForm.reset();
        } else {
          this.toast.error({
            detail: 'Error',
            summary: 'Invalid credentials',
            sticky: true,
            position: 'tr',
          });
          this.AdminLoginForm.reset();
        }
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
}
