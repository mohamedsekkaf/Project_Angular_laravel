import { HttpClient } from '@angular/common/http';
import { Component, Renderer2, ElementRef, AfterViewInit,OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-homeimage',
  templateUrl: './homeimage.component.html',
  styleUrls: ['./homeimage.component.css']
})
export class HomeimageComponent implements OnInit {
  form: any;
  name: any;
  data: unknown;
  nothing: boolean= false;
  userData: any;
  userauth: any;
  token: string;
  islikes: any;
  alllike: any;
  data1: any;
  res1: any;
  postcomment: [];
  countcomment: number;
  apiUrl: string='http://127.0.0.1:8000/api/';
  toppost: any[];
  private player: any;
  postDescription:string;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: ServiceService,
    private http : HttpClient,
    private renderer: Renderer2,
     private el: ElementRef,
     private sanitizer: DomSanitizer,
  ) { } 
  allpost: object[];
  results: any;
  query: '';
  showMore(id) {
    const description = this.el.nativeElement.querySelector('#description-' + id);
    const readMoreButton = this.el.nativeElement.querySelector('#read-more-' + id);
    const lessMoreButton = this.el.nativeElement.querySelector('#read-less-' + id);
    this.renderer.removeClass(description, 'description');
     lessMoreButton.style.display = 'block';
     readMoreButton.style.display = 'none';
  }
  showLess(id) {
    const description = this.el.nativeElement.querySelector('#description-' + id);
    const readMoreButton = this.el.nativeElement.querySelector('#read-more-' + id);
    const lessMoreButton = this.el.nativeElement.querySelector('#read-less-' + id);
    this.renderer.addClass(description, 'description');
    readMoreButton.style.display = 'block';
    lessMoreButton.style.display = 'none';
    /* this.renderer.setStyle(readMoreButton, 'display', 'none'); */
  }
   videoUrl(v) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${v}`);
  }
  ngOnInit() {
    this.dataService.showall().subscribe(res=>{
      this.allpost = res as [];
    });

    this.token= localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.userauth = this.userData.name;
  }
  createForm() {
    this.form = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }
  search(name :any){
    const query = name.target.value;
    const search = this.dataService.search(query).then(res=>{
      this.data = res
      this.allpost = res as [];
      if (this.allpost.length == 0){
        this.nothing = true;
        console.log(null);
      }else{
        this.nothing = false;
      }
    })
  }
  like(slug :string){
    const formData = new FormData();
    formData.append('user_like',this.userauth);
    formData.append('post_slug',slug);
    console.log(33);
    
    this.dataService.addlike(formData).subscribe(res =>{
      this.res1 = res; 
    })
  }
  unlike(slug){
    const formData = new FormData();
    formData.append('user_like',this.userauth);
    formData.append('post_slug',slug);    

    this.dataService.unlike(formData).subscribe(res =>{
      this.res1 = res;
    })
    return this.islikes;
  }

  getcomment(slug):number{
    const formData = new FormData();
    formData.append('slug',slug);
    this.http.get(this.apiUrl+'getcomment/'+this.userauth+'/'+slug).subscribe(res=>{
      this.postcomment = res as unknown as [] ;
      this.countcomment = this.postcomment.length
    })
    return this.countcomment;
  }
}
