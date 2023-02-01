import { HttpClient } from '@angular/common/http';
import { Component, Renderer2, ElementRef, AfterViewInit,OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  data: unknown;
  nothing: boolean= false;
  userData: any;
  userauth: any;
  token: string;
  islikes: any;
  alllike: any;
  data1: any;
  
  
  private player: any;
  postDescription:string;
  data4: any;
  constructor(
    private toastr: ToastrService,
    private dataService: ServiceService,
    private http : HttpClient,
    private renderer: Renderer2,
     private el: ElementRef,
     private sanitizer: DomSanitizer,
     private router :Router,
  ) { }
    
  allpost:any
  results: any;
  query: '';
   videoUrl(v) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${v}`);
  }
  ngOnInit() {
    this.token= localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.userauth = this.userData.name;
    this.dataService.trash(this.userauth).subscribe(res=>{
      this.allpost = res;
    });
    
  }
  restore(slug){
    const formData = new FormData();
    formData.append('slug',slug);
    this.dataService.restore(formData).subscribe(res=>{
      this.data4 =res ;
      if (this.data4.status == 1) {
        this.toastr.success(JSON.stringify(this.data4.message), JSON.stringify(this.data4.code), {
          timeOut: 3000,
          progressBar: true,
        });
      } else {
        this.toastr.error(JSON.stringify(this.data4.message), JSON.stringify(this.data4.code), {
          timeOut: 3000,
          progressBar: true
        });
      }
      this.router.navigate(['/']);
    })  
  }

}
