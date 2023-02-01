import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import  jwt_decode from 'jwt-decode';
import { ServiceService } from 'src/app/service/service.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})


export class SidbarComponent implements OnInit {
 
  token: string;
  userData: any;
  authuser: any;
  isLoggedIn: boolean = false

  constructor(
    private router : Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private service : ServiceService


  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.authuser = this.userData.name;
    this.isLoggedIns(); 

  }
  
  listenToMethodCallFromNavbar() {
    this.service.triggerMethod.subscribe(() => {
      this.doSomething();
    });
  }

  doSomething() {
    console.log('doSomething in SidebarComponent');
  }


  logout() {
    localStorage.removeItem('token');
    this.isLoggedIns()
    this.listenToMethodCallFromNavbar();

    return this.router.navigate(['/login'])

  }
  isLoggedIns() {
    if (localStorage.getItem("token") == null) {
      this.isLoggedIn = false;
      console.log(this.isLoggedIn);
    }
    else {
      this.isLoggedIn = true;
    }
  }

  hidsidbar(){
    const menuList = this.el.nativeElement.querySelector('#sidbar-mobile');
    const btnhid = this.el.nativeElement.querySelector('#btnhid');
    const btnshow = this.el.nativeElement.querySelector('#btnshow');
    btnhid.style.display = 'none'
    btnshow.style.display = 'block'
      this.renderer.addClass(menuList, 'animate__slideOutLeft');
  }

  
  

}
