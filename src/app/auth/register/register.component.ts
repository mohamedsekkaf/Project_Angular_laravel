import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MustMatch } from '../../conformed.validator';
import { ToastrService } from 'ngx-toastr';
import { Sexe} from '../../sexe';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: ServiceService,

  ) { }

  createForm() {
    this.form = this.formBuilder.group({
            name: ['', [Validators.required]],

      full_name: ['', [Validators.required]],
      sexe: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword'),
      Validator: Sexe('sexe'),
 
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.dataService.registerUser(this.form.value).subscribe(res => {
      this.data = res;
      //console.log(this.data)
      if (this.data.status == 1) {
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true,
        });
        this.submitted = false
      this.form.get('name').reset();
      this.form.get('full_name').reset();
      this.form.get('sexe').reset();
      this.form.get('email').reset();
      this.form.get('password').reset();
      this.form.get('confirmPassword').reset();
      } else {
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      }

    })
  }
}