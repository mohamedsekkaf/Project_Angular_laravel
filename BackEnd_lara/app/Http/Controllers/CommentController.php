<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\User;
use Carbon\Carbon;
class CommentController extends Controller
{
    public function addcomment(Request $request){
        $user_name = $request->input('user');
        $comment = $request->input('comment');
/*         $user_image = $request->input('user_image');
 */        $slug = $request->input('slug');
           $user =  User::where('name',$user_name)->first();
            $img_user = $user->icon_user;
        $data = array('comment'=>$comment,'slug'=>$slug,'user'=>$user_name,'user_image'=>$img_user);
        Comment::create($data);
        $response['code']       = 200;
        $response['status']     = 1;
        $response['message']    = 'Comment Add Successfulty';
        return response()->json($response);
    }

    /* show comment of post */
    public function showcomment($slug){
        $comments= Comment::where('slug' , $slug)->orderBy('id', 'desc')->get();
        foreach($comments as $comment){
            Carbon::setlocale('en');
            $comment->setAttribute('time',Carbon::parse($comment->created_at)->diffForHumans());
        }
        return response()->json($comments);
    }
    public function getcomment(Request $request){
        $slug = $request->input('slug');
        $comments= Comment::where('slug' , $slug)->orderBy('id', 'desc')->get();
        return response()->json($comments);
    }




}
