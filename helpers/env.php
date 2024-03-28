<?php

class Env
{
    public function __construct()
    {
        $env = file_get_contents("../config/.env");
        $env_exploud = explode("\n", $env);

        foreach($env_exploud as  $index => $key){
              putenv($key);
        }
    }

    public function env($key){
        return getenv($key);
    }
}