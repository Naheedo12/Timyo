<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Seeder;

class AppointmentSeeder extends Seeder
{

    public function run(): void
    {
        $users = User::where('role', 'user')->get();

        foreach ($users as $user) {
            Appointment::factory(2)->create(['user_id' => $user->id]);

            Appointment::factory(2)->approved()->create(['user_id' => $user->id]);

            Appointment::factory(2)->rejected()->create(['user_id' => $user->id]);
        }
    }
}