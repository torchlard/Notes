# command
laravel new blog

`php artisan serve` use builtin development server to serve application

# architecture
## HTTP / Console Kernel
entry: public/index.php

index.php loads composer generated autoloader definition
get an instance of Laravel application from bootstrap/app.php script

incoming request sent to HTTP kernel / console kernel
depend on type of request 
HTTP kernel: app/Http/Kernel.php

define list of HTTP middleware, handle reading and writing HTTP session, verify CSRF token
receive Request, return Response

## Service Provider
bootstrap: loading service provider for application
config in `config/app.php`

bootstrap db,queue,validation,routing

## Dispatch Request
once application has been bootstrapped, all service providers registered
Request will handed off to router for dispatching


# Binding
container binding registered within service container

## simple binding
```php
// simple binding
$this->app->bind('HelpSpot\Api', function($app){
  return new \HelpSpot\API($app->make('HttpClient'));
});


```
## singleton
bind class / interface into container only resolved 1 time
same object instance will be returned on subsequent calls into container

## binding instance
bind existing object instance into container using instance method

## bind interface to implementations
EventPusher


## binding primitives
class receive some injected classes, also needs an injected primitive value (eg. integer)
use contextual binding to inject any value class may need

## automatic injection
can type-hint dependency in constructor that is resolved by container
including controller, event listeners, mniddleware

## container events
service container fires on event each time it resolves an object
call `resolving`


# Facade
provide static interface to classes available in application's service container
serve as static proxies to underlying classes in service container

```php
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function(){
  return Cache::get('key');
})
```

# database migrate
php artisan make:migration create_tasks_table --create=tasks
php artisan migrate   // run sql to create table

php artisan make:model Task   // create model named Task


# Eloquent ORM
## timestamp
expects created_at and updated_at exist on table

## connection
specify different connection
```php
class Fight extends Model {
  protected $connection = 'connection-name';

  protected $attributes = [
    'delayed' => false    // default attribute values
  ]
}
```

# cli
## artisan
command line interface included with Laravel












