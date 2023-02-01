import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import jwt_decode from 'jwt-decode';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  slug: any;
  data: any;
  datacomment: any;
  submitted: boolean;
  form: any;
  formdesc: any;
  user_name: any;
  token: string;
  userData: any;
  datasendcomment: any;
  output: JSON;
  commentpost: [];
  data1: any;
  data2: any;
  submitteddesc: boolean;
  data3: any;
  data4: any;
  res1: any;
  islikes: any;
  authuser: any;
  alllike: [];
  countlike: any;
  countcomment: number;

  constructor(
    private activaterouter: ActivatedRoute,
    private service: ServiceService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2,


  ) { }
  openModal() {
    const modalbackdrop  = this.el.nativeElement.querySelector('.modal-backdrop'); 
    const modale = this.el.nativeElement.querySelector('#editdesc');
    console.log(modale);
    modale.style.display ='block'
    modalbackdrop.style.display ='block' 
}
CloseModal() {
  const modalbackdrop  = this.el.nativeElement.querySelector('.modal-backdrop'); 
  const modale = this.el.nativeElement.querySelector('#editdesc');
  console.log(modale);
  modale.style.display ='none'
  modalbackdrop.style.display ='none' 
}
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
  ngOnInit() {
    this.activaterouter.paramMap
      .subscribe(params => {
        this.slug = params.get('slug');
        this.showpostdetails(this.slug)
      })
    this.showcomment(this.slug);
    /* get auth user */
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.user_name = this.userData.name;
    this.authuser = this.userData.name;

    this.islike(this.slug);
    this.getlike();
    /* form validate for add comment */
    this.createForm();
    this.createFormdesc();
    this.service.down(this.slug).subscribe(res=>console.log(1)
    )
  }
 
  delete(slug){
    const formData = new FormData();
    formData.append('slug',slug);
    this.service.delete(formData).subscribe(res=>{
      this.data3 =res ;
      if (this.data3.status == 1) {
        this.toastr.success(JSON.stringify(this.data3.message), JSON.stringify(this.data3.code), {
          timeOut: 3000,
          progressBar: true,
        });
      } else {
        this.toastr.error(JSON.stringify(this.data3.message), JSON.stringify(this.data3.code), {
          timeOut: 3000,
          progressBar: true
        });
      }
       this.router.navigate(['/']); 
    }) 
  }
  

videoUrl(v) {
 return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${v}`);
}

  
  /* show post details function */
  showpostdetails(slug) {
    this.service.showpostdetails(slug).subscribe(res => {
      this.data = res;      
    })
  }
  /* show comment of post */
  showcomment(slug) {
    this.service.showcomment(slug).subscribe(res => {
      this.commentpost = res as [];
      this.countcomment = this.commentpost.length
    })
  }
  /* end show post function */

  createForm() {
    this.form = this.formBuilder.group({
      comment: ['', [Validators.required]],
    });
  } 
   get f() {
    return this.form.controls;
  }
  createFormdesc() {
    this.formdesc = this.formBuilder.group({
      desc: ['', [Validators.required]],
      title: ['', [Validators.required]],

    });
  } 
  get ff() {
    return this.formdesc.controls;
  }
  submitdesc(){
    this.submitteddesc = true
    if (this.formdesc.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('slug',this.slug);
    formData.append('title',this.formdesc.value.title);
    formData.append('desc',this.formdesc.value.desc);
    
    this.service.updatedesc(formData).subscribe(res=>{
      this.data2 =res;
      this.ngOnInit();
      if (this.data2.status == 1) {
        this.toastr.success(JSON.stringify(this.data2.message), JSON.stringify(this.data2.code), {
          timeOut: 3000,
          progressBar: true,
        });
      } else {
        this.toastr.error(JSON.stringify(this.data2.message), JSON.stringify(this.data2.code), {
          timeOut: 3000,
          progressBar: true
        });
      }
    })
    this.submitteddesc = false
    /* this.formdesc.get('desc').reset(); */
    this.router.navigate(['/postdetails/' + this.slug])
    const modale = this.el.nativeElement.querySelector('#editdesc');

  }

 
  submit() {
    this.submitted = true
    if (this.form.invalid) {
      return;
    }
    /*      this.form.value.push('user_name',this.user_name)
     */

    this.datasendcomment = {
      comment: this.form.value.comment,
      slug: this.slug,
      user: this.user_name
    }
    this.output = <JSON>this.datasendcomment; 

    this.service.addcommet(this.output).subscribe(res => {
      this.datacomment = res;

      this.showcomment(this.slug);

      console.log(this.datacomment)
      if (this.datacomment.status == 1) {
        this.toastr.success(JSON.stringify(this.datacomment.message), JSON.stringify(this.datacomment.code), {
          timeOut: 3000,
          progressBar: true,
        });
      } else {
        this.toastr.error(JSON.stringify(this.datacomment.message), JSON.stringify(this.datacomment.code), {
          timeOut: 3000,
          progressBar: true
        });
      }
    })
    this.submitted = false
    this.form.get('comment').reset();
    this.router.navigate(['/postdetails/' + this.slug])

  }


  islike(slug:string){
    console.log(slug);
    const formData = new FormData();
    formData.append('user_like',this.authuser);
    formData.append('post_slug',slug);    
   this.service.islike(formData).subscribe( data =>{
      this.data1 = data
      this.islikes = this.data1.like;
    });
   
  }
  like(slug :string){
    const formData = new FormData();
    formData.append('user_like',this.authuser);
    formData.append('post_slug',slug);    
    this.service.addlike(formData).subscribe(res =>{
      this.res1 = res; 
      this.islike(this.slug);
      this.getlike();
    })
  }
  
  unlike(slug){
    const formData = new FormData();
    formData.append('user_like',this.authuser);
    formData.append('post_slug',slug);    
    this.service.unlike(formData).subscribe(res =>{
      this.res1 = res;
      this.islike(this.slug);
      this.getlike();
    })
  }
  getlike(){
    this.service.getlike(this.slug).subscribe(res =>{
      console.log();
      
      this.alllike = res as [];
      this.countlike = this.alllike.length;
      console.log(this.countlike,'length');
    })
  } 

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    
};
 

}


