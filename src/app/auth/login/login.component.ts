import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/conformed.validator';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  data: any;
  token :any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: ServiceService,
    private router:Router,

  ) { }

  loginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.loginForm();
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.dataService.loginUser(this.form.value).subscribe(res => {
      this.data = res;
      //console.log(this.data)
      if (this.data.status === 1) {
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true,
        });
        this.token = this.data.data.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/'])
      } else if(this.data.status === 0) {
        console.log(23)
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true,
          
          
        });
      }
      this.submitted = false
      this.form.get('email').reset();
      this.form.get('password').reset();

    })
  }
}
