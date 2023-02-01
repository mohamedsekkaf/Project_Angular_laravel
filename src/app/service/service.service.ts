import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  triggerMethod = new Subject<any>();

 
constructor(
  private httpclient : HttpClient,

    ) { }
apiUrl = 'http://localhost:8000/api/';
isLoggedin: boolean = false;


  
  /* register new user */
  registerUser(data){
    return this.httpclient.post(this.apiUrl+'register',data);
  }
  /* login function */
  loginUser(data){
    return this.httpclient.post(this.apiUrl+'login',data);
  }
  /* add new post */
  addpost(data){
    return this.httpclient.post(this.apiUrl+'addpost',data);
  }
  /* Get all post */
  showall(){
    return this.httpclient.get(this.apiUrl+'getallpost');
  }
  /* is login */
  isLoggedIn() {
    if (localStorage.getItem("token") == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      return true;
    }
  }
/*   åshow post details function*/ 
 showpostdetails(slug:any){
    return  this.httpclient.get(this.apiUrl+'showpostdetails/'+slug);
  }

  /* add new comment */
  addcommet(data){
    return this.httpclient.post(this.apiUrl+'addcomment',data);
  }
  /* show all comment of post details */
  showcomment(slug:any){
    return this.httpclient.get(this.apiUrl+'showcomment/'+slug);
  }
  /* show profile post */
  profile(user:any){
    return this.httpclient.get(this.apiUrl+'profile/'+user);
  }
  /* get user of profile */
  getuser(user:any){
    return this.httpclient.get(this.apiUrl+'getuser/'+user);
  }
  /* add Follow */
  addfollow(data){
    return this.httpclient.post(this.apiUrl+'addfollow',data);
  }
  /* Delete Follow */
  unfollow(data){
    return this.httpclient.post(this.apiUrl+'unfollow',data);
    
  }
  /* get follower */
  getfollower(user){
    return this.httpclient.get(this.apiUrl+'getfollower/'+user);
  }

  /* chech auth user follow user */
  checkfollow(user,user1){
    return this.httpclient.get(this.apiUrl+'checkfollwornot/'+user+'/'+user1);
  }
  /* user following */
  getfollowing(user){
    return this.httpclient.get(this.apiUrl+'getfollowing/'+user);
  }
/* serch Method */
  search(name:string){
    const response = new Promise(resolve =>{
      this.httpclient.get(this.apiUrl+'search',{ params: { query: name } }).subscribe(data =>{
        resolve(data);
      }),err => {
        console.log(err);
      }
    });
    return response;
  }
  addlike(data){
   return this.httpclient.post(this.apiUrl+'like',data);
  }

  unlike(data){
    return this.httpclient.post(this.apiUrl+'unlike',data);
   }

   islike(data){
    return this.httpclient.post(this.apiUrl+'islike',data);
   }
   getlike(slug){
     return this.httpclient.get(this.apiUrl+'getlike/'+slug);
   }
   /* postcomment(data){
    return this.httpclient.get(this.apiUrl+'getcomment',data);
   } */
   toppost(){
     return this.httpclient.get(this.apiUrl+'toppost');
   }
   updateiconuser(data){
     return this.httpclient.post(this.apiUrl+'updateiconuser',data);
   }
   /* get 5 user  */
   topuser(user){
     return this.httpclient.get(this.apiUrl+'topuser/'+user);
   }
   updatedesc(data){
     return this.httpclient.post(this.apiUrl+'updatedesc',data);
   }
   updateuser(data){
     return this.httpclient.post(this.apiUrl+'updateuser',data);
   }
   delete(slug){
    return this.httpclient.post(this.apiUrl+'delete',slug);
   }
   trash(user){
     return this.httpclient.get(this.apiUrl+'trash/'+user);
   }
   restore(data){
    return this.httpclient.post(this.apiUrl+'restore',data);
   }

   /* Appelé ngoninit de navbar */

   down(d){
     return this.httpclient.post(this.apiUrl+'down',d);
   }

}

