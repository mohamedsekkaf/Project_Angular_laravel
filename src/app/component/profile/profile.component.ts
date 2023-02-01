import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  online = navigator.onLine;

  allpost: any;
  user: any;
  userinfo: any;
  token: string;
  userData: any;
  authuser: any;
  datafollow: any;
  output: JSON;
  user_id: any;
  data: any;
  followers: [];
  fol: string;
  count: number;
  isfollow: any;
  dataunfollow: any;
  isfollows: any;
  isfollower: any;
  following: [];
  countfollowing: number;
  post: any;
  icon_user: any;
  data3: any;
  submitted: boolean;
  form: any;
  data4: any;

  constructor(
    private dataService: ServiceService,
    private activaterouter: ActivatedRoute,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private el: ElementRef,
    private formBuilder: FormBuilder,

  ) { }

  openModal1() {
    const modalbackdrop  = this.el.nativeElement.querySelector('.modalbackdrop'); 
    const modale1 = this.el.nativeElement.querySelector('#updateuser');
    console.log(modale1);
    modale1.style.display ='block'
    modalbackdrop.style.display ='block' 
}
CloseModal1() {
  const modalbackdrop  = this.el.nativeElement.querySelector('.modalbackdrop'); 
  const modale1 = this.el.nativeElement.querySelector('#updateuser');
  console.log(modale1);
  modale1.style.display ='none'
  modalbackdrop.style.display ='none' 
}
openModal2() {
  const modalbackdrop  = this.el.nativeElement.querySelector('.modalbackdrop'); 
  const modale2 = this.el.nativeElement.querySelector('#updateimguser');
  console.log(modale2);
  modale2.style.display ='block'
  modalbackdrop.style.display ='block' 
}

CloseModal2() {
const modalbackdrop  = this.el.nativeElement.querySelector('.modalbackdrop'); 
const modale2 = this.el.nativeElement.querySelector('#updateimguser');
console.log(modale2);
modale2.style.display ='none'
modalbackdrop.style.display ='none'
}


  createForm() {
    this.form = this.formBuilder.group({
      full_name: ['', Validators.required],
      /* name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]], */
    });
  }
    get f() {
      return this.form.controls;
    }
    submit(){
      this.submitted = true
      if (this.form.invalid){
        return;
      }
      const formData = new FormData();
      formData.append('user', this.authuser);
      /* formData.append('name',this.form.value.name,);
      formData.append('email',this.form.value.email,); */
      formData.append('full_name',this.form.value.full_name,);

      this.dataService.updateuser(formData).subscribe(res => {
        this.data4 = res;
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
      }) 
    }


  ngOnInit() {
    this.createForm();
    this.activaterouter.paramMap
      .subscribe(params => {
        this.user = params.get('user');
      });
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.authuser = this.userData.name;
    /* get posts of profile */
    this.getpostprofile();
    /* get info of user profile */
    this.getuserprofile();
    /* get followers of user profile */
    this.getfollowers();
    /* test following or not */
    this.followOrNot();
    /* get users following */
    this.getfollowing();

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
  videoUrl(v) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${v}`);
  }

  uploadimage(event){
    this.icon_user = event.target.files[0];
  }
  /* update icon user */
  upiconuser(){
    const formData = new FormData();
    formData.append('name',this.authuser);
    formData.append('icon_user',this.icon_user);
    this.dataService.updateiconuser(formData).subscribe(res=>{
      this.data3 = res;

      if (this.data3.status == 1) {
        this.toastr.success(JSON.stringify(this.data3.message), JSON.stringify(this.data3.code), {
          timeOut: 2000,
          progressBar: true,
        });
      } else {
        this.toastr.error(JSON.stringify(this.data3.message), JSON.stringify(this.data3.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
    })

    
  }

  getpostprofile() {
    this.dataService.profile(this.user).subscribe(res => {
      this.allpost = res as [];
      this.post = this.allpost.length
    });
  }

  getuserprofile() {
    this.dataService.getuser(this.user).subscribe(res => {
      this.userinfo = res;
      
    })
  }

  follow() {
    this.datafollow = {
      user_id: 'sfs',
      user_make_follower: this.authuser,
      user_get_following: this.user
    }

    this.output = <JSON>this.datafollow;
    this.dataService.addfollow(this.output).subscribe(res => {
      this.data = res;
      this.followOrNot();
      this.getfollowers();
      this.getfollowing();

      if (this.data.status == 1) {
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true,
        });
      } else {
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
    })
  }
  unfollow() {
    this.dataunfollow = {
      user_id: 'sfs',
      user_make_follower: this.authuser,
      user_get_following: this.user
    }
    this.output = <JSON>this.dataunfollow;
    this.dataService.unfollow(this.output).subscribe(res => {
      this.data = res;
      this.getfollowers();
      this.getfollowing();

      this.followOrNot();
      if (this.data.status == 1) {
        this.toastr.success(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true,
        });
      } else {
        this.toastr.error(JSON.stringify(this.data.message), JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
    })

  }
  /*   get followers */
  getfollowers() {
    this.dataService.getfollower(this.user).subscribe(res => {
      this.followers = res as [];
      this.count = this.followers.length;
    })
  }
  /* check userauth follow user profile or not  */
  followOrNot() {
    this.dataService.checkfollow(this.authuser, this.user).subscribe(res => {
      this.isfollow = res;
      this.isfollower = this.isfollow.isfollow;
      
    })
  }
  /* get users following */
  getfollowing(){
    this.dataService.getfollowing(this.user).subscribe(res => {
      this.following = res as [];
      this.countfollowing= this.following.length
    })
  }


}


/* denied */