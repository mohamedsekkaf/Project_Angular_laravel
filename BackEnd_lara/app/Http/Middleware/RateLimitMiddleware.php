<?php

namespace App\Http\Middleware;

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class RateLimitMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  int  $limit
     * @param  int  $time
     * @return mixed
     */
    public function handle($request, Closure $next, $limit = 60, $time = 60)
    {
        $key = $this->getKey($request);
        $current = (int) cache($key, 0) + 1;
        cache([$key => $current], ceil($time / $limit));

        if ($current > $limit) {
            return new Response(
                'Too Many Requests',
                429
            );
        }

        return $next($request);
    }

    /**
     * Get the rate limit key for the current request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function getKey($request)
    {
        return sprintf(
            '%s:%s',
            $request->ip(),
            $request->path()
        );
    }
}

