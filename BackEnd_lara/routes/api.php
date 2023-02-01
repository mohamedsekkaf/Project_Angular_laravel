<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['rate_limit:100,1'])->group(function () {
    Route::get('/', function () {
        //
    });
});

Route::post('register','UserController@register');
Route::post('login','UserController@login');
Route::post('updateuser','UserController@updateuser');


Route::get('getallpost','HomeController@getallpost');

Route::post('addpost','PostController@addpost');
Route::get('/showpostdetails/{slug}','PostController@showpostdetails');
Route::post('updatedesc','PostController@updatedesc');
Route::post('delete','PostController@delete');
Route::get('trash/{user}','PostController@trash');
Route::post('restore','PostController@restore');




Route::post('addcomment' , 'CommentController@addcomment');
Route::get('showcomment/{slug}' , 'CommentController@showcomment');
Route::get('getcomment/{$user_like}/{$post_slug}','CommentController@getcomment' );

Route::get('/profile/{user}','ProfileController@profile');
Route::get('/getuser/{user}','ProfileController@getuser');

Route::post('updateiconuser','ProfileController@updateiconuser');


Route::post('addfollow','FollowerController@addfollow');
Route::get('getfollower/{user}','FollowerController@getfollower');
Route::get('checkfollwornot/{user}/{user1}','FollowerController@checkfollwornot');
Route::post('unfollow','FollowerController@unfollow');
Route::get('getfollowing/{user}','FollowerController@getfollowing');
Route::get('topuser/{user}','FollowerController@topuser');



Route::get('search', 'HomeController@search');

Route::post('like', 'LikeController@like');
Route::post('unlike', 'LikeController@unlike');
Route::get('getlike/{slug}', 'LikeController@getlike');
Route::post('islike', 'LikeController@islike');
Route::get('toppost', 'LikeController@toppost');



/* 
Route::get('post/{slug}/islike', 'PostController@islike');


 */


Route::post('down', 'LikeController@down');





Route::get('images/{filename}', function ($filename)
{
    return asset('image_post/'.$filename);
});
