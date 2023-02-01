<?php

namespace App\Http\Controllers;
use App\Follower;
use App\User;
use DB;
use Mail;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    public function addfollow(Request $request){
        $user_id = $request->input('user_id');
        $user_make_follower = $request->input('user_make_follower');
        $user_get_following = $request->input('user_get_following');

        $data = array('user_id'=>$user_id,'user_make_follower'=>$user_make_follower,'user_get_following'=>$user_get_following,'follow'=>'default');
        Follower::create($data);
        $response['code']       = 200;
        $response['status']     = 1;
        $response['message']    = 'Following Successfulty';
        $user = User::where('name', $request->user_get_following)->first();
        return response()->json($response);
    }

    public function getfollower($user){
        $followers = Follower::where('user_get_following',$user)->get();
        return response()->json($followers);
    }
    public function checkfollwornot($user,$user1){
        $followers = Follower::where('user_make_follower',$user)->where('user_get_following',$user1)->get();
        if(sizeof($followers)!= 0){
            return response()->json(['isfollow'=>true]);
        }else return response()->json(['isfollow'=>false]);
        
    }
    public function unfollow(Request $request){
        $user_id = $request->input('user_id');
        $user_make_follower = $request->input('user_make_follower');
        $user_get_following = $request->input('user_get_following');
        $followersd = Follower::where('user_make_follower',$user_make_follower)->where('user_get_following',$user_get_following)->get();
 
        DB::table('followers')->where('user_make_follower',$user_make_follower)->where('user_get_following',$user_get_following)->delete();

        $response['code']       = 200;
        $response['status']     = 1;
        $response['message']    = 'UnFollow Successfulty';
        return response()->json($response);
    }

    public function getfollowing($user){
        $followers = Follower::where('user_make_follower',$user)->get();
        return response()->json($followers);
    }



    public function topuser($user){
        $followers = Follower::where('user_make_follower',$user)->get();
        $topUser = User::inRandomOrder()->take(25)->get();
        foreach($topUser as $key => $usr){ 
            foreach($followers as $f){
                if($f->user_make_follower === $user && $f->user_get_following === $usr->name){
                  
                    $topUser->forget($key);
                }
            }
        }
        if($topUser->isEmpty()){
            return Response::json([]);
        }else{
            
            return Response::json($topUser->values());
        }
 
    }
}
