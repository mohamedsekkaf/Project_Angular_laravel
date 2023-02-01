<?php

namespace App\Http\Middleware;

use Closure;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        Header("Access-Control-Allow-Origin: *");
        Header("Access-Control-Allow-Methods:  ,GET,DELETE,PUT,POST");
        Header("Access-Control-Allow-Headers: Origin, Content-Type, Accept");
        return $next($request);
    }
}
