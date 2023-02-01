import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/conformed.validator';
import { ServiceService } from 'src/app/service/service.service';
import jwt_decode from 'jwt-decode';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  form: FormGroup;
  data : any;
  submitted : any;
  data1: any;
  selectedfile: File = null;
  datasendpost: any;
  output: JSON;
  token: string;
  userData: any;
  userauth: any;
  files: File;
  uploadForm: any;
  types: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: ServiceService,
    private renderer: Renderer2,
     private el: ElementRef,
  ) { }

  ngOnInit() {
    this.createForm();
    this.token= localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.userauth = this.userData.name;
  }

  /* Add New Post */
  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', [Validators.required]],
      category: ['', [Validators.required]],
      file: ['', /* [Validators.required] */]
    });


    


  }
  get f() {
    return this.form.controls;
  }
  type(event){
    this.types = event.target.value
    console.log(event.target.value)
    const image = this.el.nativeElement.querySelector('.image');
      const video = this.el.nativeElement.querySelector('.video');
    if(this.types === 'Image'){
      image.style.display ='block'
      video.style.display ='none'
    }else{
      image.style.display ='none'
      video.style.display ='block'
    }
    
  }
  uploadimage(event){
     this.files = event.target.files[0];
    }

  submit(){
    this.submitted = true
    if (this.form.invalid){
      return;
    }
    const formData = new FormData();
    formData.append('file', this.files);
    formData.append('title',this.form.value.title,);
    formData.append('desc', this.form.value.desc);
    formData.append('category_name', this.form.value.category);
    formData.append('user_name', this.userauth);
    formData.append('type',this.types);

   console.log(formData);

    this.datasendpost = {
      title:this.form.value.title,
      desc:this.form.value.desc,
      category_name:this.form.value.category,
      user_name:this.userauth,

      file:this.files

    }     
    
    this.output = <JSON>this.datasendpost;
    this.dataService.addpost(formData).subscribe(res => {
      this.data = res;
      console.log(this.data)
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
