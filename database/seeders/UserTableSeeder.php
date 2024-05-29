<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // get admin role
        $role = Role::where('name', 'super-admin')->first();

        // create new admin
        $user = User::create([
            'name' => 'Rafi Taufiqurrahman',
            'email' => 'raf@dev.com',
            'password' => bcrypt('password'),
        ]);

        // assign a role to user
        $user->assignRole($role);
    }
}
