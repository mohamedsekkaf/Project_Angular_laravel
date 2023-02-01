import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/conformed.validator';
import { ServiceService } from 'src/app/service/service.service';
import jwt_decode from 'jwt-decode';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-testfile',
  templateUrl: './testfile.component.html',
  styleUrls: ['./testfile.component.css']
})
export class TestfileComponent implements OnInit {
form:any;
  constructor( private http:HttpClient) { }

  ngOnInit() {
  }
  uploadfile(event){
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    
this.http.post('http://localhost:8000/api/file', formData).subscribe(response => {
    console.log(response);
});
  }
  

}
