<?php

namespace App\Http\Controllers;
use App\Like;
use App\Post;
use Carbon\Carbon;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function getlike($slug){
        $likes = Like::where('post_slug',$slug)->get();

        return response()->json($likes);
    }
    public function like(Request $request){
        $user_like = $request->input('user_like');
        $post_slug = $request->input('post_slug');
        $follow_number =  Post::where('slug',$post_slug)->value('follow');
        Post::where('slug',$post_slug)->update(array('follow'=>$follow_number+1));
        $data  = array('user_like'=>$user_like,'post_slug'=>$post_slug);
        Like::create($data);
        return response()->json('200');
    }
    public function unlike(Request $request){
        $user_like = $request->input('user_like');
        $post_slug = $request->input('post_slug');
        $follow_number =  Post::where('slug',$post_slug)->value('follow');
        Post::where('slug',$post_slug)->update(array('follow'=>$follow_number-1));
        Like::where('post_slug',$post_slug)->where('user_like',$user_like)->delete();
        $response['status'] = true;
        return response()->json($response);
    }

    public function islike(Request $request){
        $user_like = $request->input('user_like');
        $post_slug = $request->input('post_slug');
        /* dd($user_like ,$post_slug); */
        $like = Like::where('user_like',$user_like)->where('post_slug',$post_slug)->first();
        if($like){
            $response['like']       = true;
            return response()->json($response);
        }else{
            $response['like']       = false;
            return response()->json($response);
        }
    }

    public function toppost(){
        $topPosts = Post::where('delete','true')->orderBy('follow', 'desc')->take(10)->get();
        foreach($topPosts as $post){
            Carbon::setlocale('fr');
            $post->setAttribute('time',Carbon::parse($post->created_at)->diffForHumans());
        } 
        return response()->json($topPosts);
    }

    public function down(){
        $file= public_path(). '/image_post/4x3-cla_cui_play_darwin_1_1233674761_1674427456.jpeg';
        $headers = array(
            'Content-Type: application/pdf',
            );

    return response()->download($file, '1674427456.jpeg', $headers);
    } 

    
}
