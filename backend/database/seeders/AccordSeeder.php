<?php

namespace Database\Seeders;

use App\Models\Accord;
use Illuminate\Database\Seeder;

class AccordSeeder extends Seeder
{
    public function run(): void
    {
        Accord::factory(25)->create();
    }
}
