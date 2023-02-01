<?php

namespace App\Http\Controllers;
use App\User;
use Auth;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Contracts\JWTSubject;


class UserController extends Controller
{
    public function register(Request $request){
        $email = User::where('email' , $request['email'])->first();
        $name = User::where('name' , $request['name'])->first();
        if ($email){
            $response['status']     = 0;
            $response['message']    = 'Email Already Exists';
            $response['code']       = 409;
        }else{
            if($name){
                $response['status']     = 0;
                $response['message']    = 'name Already Used';
                $response['code']       = 409;
            }else{
                if($request->sexe === 'Homme' | $request->sexe ==='Femelle'){
                    if($request->sexe === 'Homme'){
                        $icon_user = 'homme.svg';
                    }else{
                        $icon_user = 'femelle.svg';
                    }
                    $user = User::create([
                        'full_name'      => $request->full_name,
                        'name'      => str_replace('.','', $request->name),
                        'sexe'      => $request->sexe,
                        'email'     => $request->email,
                        'icon_user' => $icon_user,
                        'follower'  => 0,
                        'password'  => bcrypt($request->password)
                    ]);
                    $response['status']     = 1;
                    $response['message']    = 'User Registered Successfuly';
                    $response['code']       = 200;
                }else{
                    $response['status']     = 0;
                    $response['message']    = 'Entrer Une Valide Sexe';
                    $response['code']       = 409;
                }
            }
        }
        return response()->json($response);
    }


    /* Function login */
    public function login(Request $request){
        $userinfo = $request->only('email','password');
        try {
            if (!JWTAuth::attempt($userinfo)){
                $response['data']       = null;
                $response['code']       = 401;
                $response['status']     = 0;
                $response['message']    = 'Email Or Password Is Incorrect';
                return response()->json($response);
            }
        }catch(JWTException $e){
            $response['data']       = null;
            $response['code']       = 500;
            $response['message']    = 'Could Not Create Token';
            return response()->json($response);
        }

        $user = auth()->user();
        $data['token'] = auth()->claims([
            'user_id' => $user->id,
            'name'    => $user->name,
            'email'   => $user->email
        ])->attempt($userinfo);
        /* $user = auth()->user();
        $data['token'] = ([
            'user_id' => $user->id,
            'email'   => $user->email
        ]); */
        $response['data']       = $data;
        $response['code']       = 200;
        $response['name']       = $user->name;
        $response['status']     = 1;
        $response['message']    = 'Login Successfulty';
        return response()->json($response);
    }


    public function updateuser(Request $request){
        $user = $request->input('user');
        $full_name = $request->input('full_name');
        $name = $request->input('name');
        $email = $request->input('email');

            if($request->input('full_name') != null){
                DB::table('users')->where('name',$user)
                ->update(array('full_name'=>$full_name/* ,'name'=>$name,'email'=>$email */));
                $response['code']       = 200;
                $response['status']     = 1;
                $response['message']    = 'Updated Successfulty';
                return response()->json($response);
            }else{
                $response['code']       = 401;
                $response['status']     = 0;
                $response['message']    = 'EnTer Your Full Name';
                return response()->json($response);
            }
        
    }
}
