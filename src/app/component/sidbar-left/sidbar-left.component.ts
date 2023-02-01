import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sidbar-left',
  templateUrl: './sidbar-left.component.html',
  styleUrls: ['./sidbar-left.component.css']
})
export class SidbarLeftComponent implements OnInit {
  topposts: any;
  topusers: any;
  userData: any;
  token: string;
  authuser: any;
  data: any;
  isfollow: any;
  isfollower: boolean;

  constructor(
    private htttp: HttpClient,
    private service: ServiceService,
    private dataService: ServiceService,
    private activaterouter: ActivatedRoute,
    private toastr: ToastrService,
    private changeDetector: ChangeDetectorRef,
    private renderer: Renderer2,
     private el: ElementRef,
     private route :Router,

  ) { }
 

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.authuser = this.userData.name;

    this.toppost();
    this.topuser();
  }
  refrech(){
    this.topuser();
  }
  
  toppost() {
    this.service.toppost().subscribe(res => {
      this.topposts = Object.values(res);
    })
  }
  topuser() {
    this.service.topuser(this.authuser).subscribe(res => {
      this.topusers = res;       
    })
  }


  followOrNot(name) {
    this.dataService.checkfollow(this.authuser, name).subscribe(res => {
      this.isfollow = res;
      this.isfollower = this.isfollow.isfollow;
      return this.isfollower;
    })
  }


  follow(name) {
    const formData =new FormData();
    formData.append('user_id','o')
    formData.append('user_make_follower',this.authuser)
    formData.append('user_get_following',name)

    this.dataService.addfollow(formData).subscribe(res => {
      this.data = res;

      const follow = this.el.nativeElement.querySelector('#follow-'+name);
      const following = this.el.nativeElement.querySelector('#following-'+name);
      console.log(following);
      
        follow.style.display ='none'
        following.style.display ='block'
        following.style.background ='#F55050'


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



  unfollow(name) {
console.log(name);

    const formData =new FormData();
    formData.append('user_id','o')
    formData.append('user_make_follower',this.authuser)
    formData.append('user_get_following',name)

    this.dataService.unfollow(formData).subscribe(res => {
      this.data = res;

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
}
