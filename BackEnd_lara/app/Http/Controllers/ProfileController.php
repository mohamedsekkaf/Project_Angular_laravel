<?php

namespace App\Http\Controllers;
use App\Post;
use App1\Follower;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

use DB;

class ProfileController extends Controller
{
    public function profile($user){
        $post = Post::where('user_name',$user)->where('delete','true')->orderBy('id','desc')->get();
        foreach($post as $p){
            Carbon::setlocale('fr');
            $p->setAttribute('name', strtoupper($p->user_name));
            $p->setAttribute('time',Carbon::parse($p->created_at)->diffForHumans());
        } 

        return response()->json($post);
    }

    public function getuser($user){
        $getuser = User::where('name',$user)->get();
        return response()->json($getuser);
    }



    public function updateiconuser(Request $request){
        $name = $request->input('name');
        $icon_user = $request->file('icon_user');
        
        if ($request->hasFile('icon_user')){
            $imgname = $request->file('icon_user')->getClientOriginalName();
            $imgNameOly = pathinfo($imgname,PATHINFO_FILENAME);
            $Extension = $request->file('icon_user')->getClientOriginalExtension();
            $ImgNameComplete = str_replace(' ', '_',$imgNameOly).'_'.rand().'_'.time().'.'.$Extension;
            $destinationPath = public_path('../src/assets/image_users');
            $path = $request->file('icon_user')->move($destinationPath,$ImgNameComplete);
            DB::table('users')
            ->where('name', $name)
            ->update(['icon_user' => $ImgNameComplete]);
            DB::table('users')->where('name',$name)->update(array('icon_user'=>$ImgNameComplete));
            
            $response['code']       = 200;
            $response['status']     = 1;
            $response['message']    = 'Image updated';
            return response()->json($response);
        }else{
            $response['code']       = 401;
            $response['status']     = 0;
            $response['message']    = 'Please Select Corecte Image';
            return response()->json($response);
        }


      }
}
