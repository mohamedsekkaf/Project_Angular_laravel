<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Faker\Factory as Faker;
use App\User;
class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('full_name');
            $table->string('name');
            $table->index('name');
            $table->string('sexe');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('icon_user');
            $table->index('icon_user');
            $table->integer('follower');
            $table->rememberToken();
            $table->timestamps();
        });

        
        for($i = 0 ;$i<30 ;$i++){
            $faker = Faker::create();
            $name = $faker->name;
            User::create([
                'full_name'      => $name,
                'name'      => substr(str_replace(' ', '_',$name),0,9),
                'sexe'      => 'Homme',
                'email'     => substr(str_replace(' ', '_',$name),0,9).'@gmail.com',
                'icon_user' => 'homme.svg',
                'follower'  => mt_rand(0, 100000),
                'password'  => bcrypt(12)
            ]);
        }

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
