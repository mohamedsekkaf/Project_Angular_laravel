<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function file(Request $request){
        /* if ($request->hasFile('file')) {
            $imgname = $request->file('file')->getClientOriginalName();
            $imgNameOly = pathinfo($imgname,PATHINFO_FILENAME);
            $Extension = $request->file('file')->getClientOriginalExtension();
            $ImgNameComplete = str_replace(' ', '_',$imgNameOly).'_'.rand().'_'.time().'.'.$Extension;
            $destinationPath = public_path('/image_post/');
            $path = $request->file('file')->store('public/images');
            $path = $request->file('file')->move($destinationPath,$ImgNameComplete);

            return response()->json(['success' => 'File uploaded successfully.']);
        }
        return response()->json(['error' => 'File not found.'], 400);    */     
        if ($request->hasfile('image')){
            $imgname = $request->file('image')->getClientOriginalName();
            $imgNameOly = pathinfo($imgname,PATHINFO_FILENAME);
            $Extension = $request->file('image')->getClientOriginalExtension();
            $ImgNameComplete = str_replace(' ', '_',$imgNameOly).'_'.rand().'_'.time().'.'.$Extension;
            $destinationPath = public_path('../../projetAngular/src/assets/image_post');
            $path = $request->file('image')->move($destinationPath,$ImgNameComplete);
return response('good');
        } 
    }
    


}
