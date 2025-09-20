<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Announcement;
use App\Models\Attendance;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ExtracurricularSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample users
        $pembina1 = User::create([
            'name' => 'Dr. Ahmad Sudrajat',
            'email' => 'pembina1@example.com',
            'password' => Hash::make('password'),
            'role' => 'pembina',
            'phone' => '081234567890',
            'address' => 'Jl. Merdeka No. 123, Jakarta',
            'email_verified_at' => now(),
        ]);

        $pembina2 = User::create([
            'name' => 'Prof. Siti Nurhaliza',
            'email' => 'pembina2@example.com',
            'password' => Hash::make('password'),
            'role' => 'pembina',
            'phone' => '081234567891',
            'address' => 'Jl. Proklamasi No. 45, Jakarta',
            'email_verified_at' => now(),
        ]);

        // Create sample anggota users
        $anggota1 = User::create([
            'name' => 'Budi Santoso',
            'email' => 'anggota1@example.com',
            'password' => Hash::make('password'),
            'role' => 'anggota',
            'nim' => '20210001',
            'phone' => '081234567892',
            'address' => 'Jl. Sudirman No. 67, Jakarta',
            'email_verified_at' => now(),
        ]);

        $anggota2 = User::create([
            'name' => 'Sari Dewi',
            'email' => 'anggota2@example.com',
            'password' => Hash::make('password'),
            'role' => 'anggota',
            'nim' => '20210002',
            'phone' => '081234567893',
            'address' => 'Jl. Thamrin No. 89, Jakarta',
            'email_verified_at' => now(),
        ]);

        // Create more anggota users
        User::factory(15)->anggota()->create();
        User::factory(3)->pembina()->create();

        // Create activities
        Activity::factory(10)->published()->create();
        Activity::factory(5)->upcoming()->create();
        Activity::factory(3)->create(['status' => 'draft']);

        // Create projects
        Project::factory(8)->inProgress()->create();
        Project::factory(5)->completed()->create();
        Project::factory(4)->create(['status' => 'pending']);

        // Create announcements
        Announcement::factory(10)->published()->create();
        Announcement::factory(3)->highPriority()->create();
        Announcement::factory(2)->create(['is_published' => false]);

        // Create attendances
        $activities = Activity::published()->get();
        $anggotaUsers = User::anggota()->get();

        foreach ($activities as $activity) {
            // Create attendance for 70% of anggota users
            $attendees = $anggotaUsers->random(random_int(7, $anggotaUsers->count()));
            
            foreach ($attendees as $anggota) {
                Attendance::factory()->create([
                    'activity_id' => $activity->id,
                    'user_id' => $anggota->id,
                ]);
            }
        }
    }
}