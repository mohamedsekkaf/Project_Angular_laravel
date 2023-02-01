<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public $table ="posts";
    protected $fillable = ['id','title','desc','slug','user_name',
    'category_name','image_post','img_user','follow','type','delete'];
}
