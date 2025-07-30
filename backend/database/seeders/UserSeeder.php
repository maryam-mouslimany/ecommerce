<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin users
        User::factory(3)->admin()->create();

        // Create customer users
        User::factory(20)->customer()->create();
    }
}
