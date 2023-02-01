import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AngularEditorModule } from '@kolkov/angular-editor';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';

import { RegisterComponent } from './auth/register/register.component';

import { HomeComponent } from './component/home/home.component';

import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AddpostComponent } from './component/addpost/addpost.component';
import { SidbarComponent } from './component/sidbar/sidbar.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';
import { SidbarLeftComponent } from './component/sidbar-left/sidbar-left.component';
import { ProfileComponent } from './component/profile/profile.component';
import { TestfileComponent } from './testfile/testfile.component';
import { HomevideoComponent } from './component/homevideo/homevideo.component';
import { HomeimageComponent } from './component/homeimage/homeimage.component';
import { TrashComponent } from './component/trash/trash.component';
import { TopPostComponent } from './component/top-post/top-post.component';

const routes:Routes =[
  {
    path : '' ,         component : HomeComponent,
    canActivate :[AuthGuard]
  },
  {
    path : 'addpost' , component : AddpostComponent,
    canActivate :[AuthGuard]
  },
  {
    path : 'login' ,    component : LoginComponent
  },
  {
    path : 'register' , component : RegisterComponent
  },
  {
    path : 'post-details' , component : PostDetailsComponent,
    canActivate :[AuthGuard]
  },
  {
    path : 'postdetails/:slug' ,component : PostDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'profile/:user' , component : ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'test' , component : TestfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'video' , component : HomevideoComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'image' , component : HomeimageComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'trash' , component : TrashComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'navbar' , component : NavbarComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'app-top-post' , component : TopPostComponent,
    canActivate:[AuthGuard]
  }
 
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    AddpostComponent,
    SidbarComponent,
    PostDetailsComponent,
    SidbarLeftComponent,
    ProfileComponent,
    TestfileComponent,
    HomevideoComponent,
    HomeimageComponent,
    TrashComponent,
    TopPostComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes,{enableTracing: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularEditorModule,
    
   
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
