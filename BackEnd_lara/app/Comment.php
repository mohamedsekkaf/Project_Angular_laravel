<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{ 
    public $table ="comments";
    protected $fillable = ['id','comment','slug','user','user_image'];
    
}
