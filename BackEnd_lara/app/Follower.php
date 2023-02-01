<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    public $table ="followers";
    protected $fillable = ['id','user_id','user_make_follower','user_get_following','follow'];
}
