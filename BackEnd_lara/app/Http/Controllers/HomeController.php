<?php

namespace App\Http\Controllers;
use App\Post;
use Illuminate\Http\Request;
use Carbon\Carbon;
class HomeController extends Controller
{
    public function getallpost()
    {
        $all  = Post::where('delete','true')->orderBy('id', 'desc')->get();
        foreach($all as $post){
            Carbon::setlocale('fr');
            $post->setAttribute('name', strtoupper($post->user_name));
            $post->setAttribute('time',Carbon::parse($post->created_at)->diffForHumans());
        }
        return response()->json($all);
    }

    public function search(Request $request){
        $query = $request->input('query');
        $results = Post::where('title', 'LIKE', '%'.$query.'%')
        ->orwhere('desc', 'LIKE', '%'.$query.'%')
        ->orwhere('category_name', 'LIKE', '%'.$query.'%')->orderBy('id','desc')->get();
        return response()->json($results);
    }

   
}
