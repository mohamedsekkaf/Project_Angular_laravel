<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    public $table ="likes";
    protected $fillable = ['id','user_like','post_slug'];
    
}
