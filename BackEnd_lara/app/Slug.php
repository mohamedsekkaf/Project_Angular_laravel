<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Slug extends Model
{
    public $table ="slugs";
    protected $fillable = ['id','slug'];
}
