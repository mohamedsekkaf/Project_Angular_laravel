<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('slug');
            $table->string('desc',5000);
            $table->string('user_name');
            $table->string('category_name');
            $table->string('image_post');
            $table->string('img_user');
            $table->integer('follow');
            $table->string('type');
            $table->string('delete');
            $table->timestamps();

            $table->foreign('user_name')->references('name')->on('users')->onDelete('cascade')->onUpdate('cascade');

            $table->foreign('img_user')->references('icon_user')->on('users')->onDelete('cascade')->onUpdate('cascade');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
