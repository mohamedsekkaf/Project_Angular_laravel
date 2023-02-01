import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/conformed.validator';
import jwt_decode from 'jwt-decode';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],  
})
export  class NavbarComponent implements OnInit {


  userData: any;
  token: any;
  username: any;
  isLoggedIn: boolean = false
  data: any;
  allpost: any;
  nothing: boolean;
  form: FormGroup;
  submitted: any;
  data1: any;
  selectedfile: File = null;
  datasendpost: any;
  output: JSON;

  userauth: any;
  files: File;
  uploadForm: any;
  data3: unknown;
  types: any;
  constructor(
    private router: Router,
    private dataservice: ServiceService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: ServiceService,
    private renderer: Renderer2,
    private el: ElementRef,
    private route: ActivatedRoute

  ) { }
  ngOnInit() {
    this.createForm();

    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.userauth = this.userData.name;
    this.isLoggedIns();
  }
  callMethodInSidebar() {
    this.dataService.triggerMethod.next();
  }
  isLoggedIns() {
    if (localStorage.getItem("token") == null) {
      this.isLoggedIn = false;
      console.log(this.isLoggedIn);
    }
    else {
      this.isLoggedIn = true;
      console.log(true);
    }
  }


  showmenu(){
    const menuList = this.el.nativeElement.querySelector('#sidbar-mobile');
    const btnhid = this.el.nativeElement.querySelector('#btnhid');
    const btnshow = this.el.nativeElement.querySelector('#btnshow');
    this.renderer.removeClass(menuList, 'animate__slideOutLeft'); 
    btnshow.style.display = 'none';
    btnhid.style.display = 'block'
    menuList.style.display = 'block';
  }
  hidmenu(){
    const menuList = this.el.nativeElement.querySelector('#sidbar-mobile');
    const btnhid = this.el.nativeElement.querySelector('#btnhid');
    const btnshow = this.el.nativeElement.querySelector('#btnshow');
    btnhid.style.display = 'none'
    btnshow.style.display = 'block'
      this.renderer.addClass(menuList, 'animate__slideOutLeft');

  }

  openModal() {
    const modalbackdrop  = this.el.nativeElement.querySelector('.modal-backdrop'); 
    const modale = this.el.nativeElement.querySelector('#myModal');
    console.log(modale);
    modale.style.display ='block'
    modalbackdrop.style.display ='block' 
}
CloseModal() {
  const modalbackdrop  = this.el.nativeElement.querySelector('.modal-backdrop'); 
  const modale = this.el.nativeElement.querySelector('#myModal');
  console.log(modale);
  modale.style.display ='none'
  modalbackdrop.style.display ='none' 
}

  type(event) {
    this.types = event.target.value
    console.log(event.target.value)
    const image = this.el.nativeElement.querySelector('.image');
    const video = this.el.nativeElement.querySelector('.video');
    if (this.types === 'Image') {
      image.style.display = 'block'
      video.style.display = 'none'
    } else {
      image.style.display = 'none'
      video.style.display = 'block'
    }
  }



  search(name: any) {
    const query = name.target.value;
    const search = this.dataservice.search(query).then(res => {
      this.data3 = res
      this.allpost = res;
      if (this.data === null) {
        this.nothing = null;
      }
      console.log(this.nothing);


    })

  }
  logout() {
    localStorage.removeItem('token');
    this.isLoggedIns()
    return this.router.navigate(['/login'])
    
  }

  /* Add New Post */
  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', [Validators.required]],
      category: ['', [Validators.required]],
      file: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }
  get f() {
    return this.form.controls;
  }
  uploadimage(event) {
    this.files = event.target.files[0];

  }

  submit() {
    this.submitted = true
    if (this.form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.files);
    formData.append('vedio', this.form.value.file);
    formData.append('title', this.form.value.title,);
    formData.append('desc', this.form.value.desc);
    formData.append('category_name', this.form.value.category);
    formData.append('user_name', this.userauth);
    formData.append('type', this.types);

    this.dataService.addpost(formData).subscribe(res => {
      this.data = res;
      if (this.data.status == 1) {
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 3000,
          progressBar: true,
        });
      } else {
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 3000,
          progressBar: true
        });
      }
      this.submitted = false
    this.form.get('title').reset();
    this.form.get('desc').reset();
    this.form.get('category').reset();
    this.form.get('file').reset();
    this.form.get('type').reset();
    this.router.navigate(['/postdetails/'+4])
    const modale = this.el.nativeElement.querySelector('#myModal');
    modale.style.display ='block' 
    }) 
    
    

  }
  /* End  Add New Post */
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
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
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
