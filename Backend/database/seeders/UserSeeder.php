<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        User::create([
            'name' => 'salma',
            'email' => 'salma@gmail.com',
            'password' => Hash::make('salma'),
            'role' => 'admin',
        ]);

        User::factory(5)->create();
    }
}