<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Slug;
use App\Post;
use App\Comment;
use DB;
use GuzzleHttp\Client;
use App\User;
class PostController extends Controller
{
    public function addpost(Request $request){
      $slug = Slug::all();
      foreach($slug as $s){
        $slug = $s->slug+1;
      }
      DB::table('slugs')
      ->update(array('slug'=>$slug));
        $title = $request->input('title');
        $desc = $request->input('desc');
        $user_name = $request->input('user_name');
        $category_name = $request->input('category_name');
        $image_post = $request->input('image');
        $user =  User::where('name',$user_name)->first();
        $img_user = $user->icon_user;
        $type = $request->input('type');
      
        if($type === 'Image'){
          if ($request->hasFile('file')){
              $imgname = $request->file('file')->getClientOriginalName();
              $imgNameOly = pathinfo($imgname,PATHINFO_FILENAME);
              $Extension = $request->file('file')->getClientOriginalExtension();
              $ImgNameComplete = str_replace(' ', '_',$imgNameOly).'_'.rand().'_'.time().'.'.$Extension;
              $destinationPath = public_path('../../projetAngular/src/assets/image_post');
              $path = $request->file('file')->move($destinationPath,$ImgNameComplete);

              $data=array('title'=>$title,'desc'=>$desc,'slug'=>$slug,
              'user_name'=>$user_name,'category_name'=>$category_name,
              'image_post'=>$ImgNameComplete,'img_user'=>$img_user,
              'follow'=>0,'type'=>$type,'delete'=>'true');
              Post::create($data);
              
              $response['code']       = 200;
              $response['status']     = 1;
              $response['message']    = 'Post Add Successfulty';
              return response()->json($response);
            }else{
                $image_post = $request->file('file');
                $response['code']       = 401;
                $response['status']     = 0;
                $response['message']    = 'Select Valide Image';
                return response()->json($response);
          }

        }else{
          $videoID = $request->input('vedio');
            
                $data=array('title'=>$title,'desc'=>$desc,'slug'=>$slug,
                'user_name'=>$user_name,'category_name'=>$category_name,
                'image_post'=>$videoID,'img_user'=>$img_user,
                'follow'=>0,'type'=>$type,'delete'=>'true');
                Post::create($data);
                
                $response['code']       = 200;
                $response['status']     = 1;
                $response['message']    = 'Post Add Successfulty';
                return response()->json($response);
        }
    }

    public function showpostdetails($slug){

      $pd = Post::where('slug',$slug)->get();
      foreach($pd as $post){
          Carbon::setlocale('fr');
          $post->setAttribute('name', strtoupper($post->user_name));
          $post->setAttribute('time',Carbon::parse($post->created_at)->diffForHumans());
      } 
     return  response()->json($pd); 
  }

  public function updatedesc(Request $request){
    $slug = $request->input('slug');
    $title = $request->input('title');
    $desc = $request->input('desc');

    if($desc === null){
        $response['code']       = 401;
        $response['status']     = 0;
        $response['message']    = 'Description is Empty';
        return response()->json($response);
        }else{
          DB::table('posts')->where('slug',$slug)->update(array('title'=>$title,'desc'=>$desc));
          $response['code']       = 200;
          $response['status']     = 1;
          $response['message']    = 'Updated Successfulty';
          return response()->json($response);
        }
    }
    /* delete post  */
  public function delete(Request $request){
      DB::table('posts')->where('slug',$request->input('slug'))->update(array('delete'=>'false'));
      $response['code']       = 200;
      $response['status']     = 1;
      $response['message']    = 'Deleted Successfulty';
      return response()->json($response);
  }



    /* Trash posts og users */
    public function trash($user){
      $posts = Post::where('user_name',$user)->where('delete','false')->get();

      return response()->json($posts);
    }

    public function restore(Request $request){
      $id = DB::table('posts')->latest('id')->value('id');
      
      Post::where('slug',$request->input('slug'))->update(array('id'=>$id+1,'delete'=>'true'));
      $response['code']       = 200;
      $response['status']     = 1;
      $response['message']    = 'Restored Successfulty';
      return response()->json($response);
    }


}
