<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['present', 'absent', 'late']);
        $checkInTime = $status !== 'absent' ? fake()->dateTimeBetween('-30 days', 'now') : null;

        return [
            'activity_id' => Activity::inRandomOrder()->first()->id ?? Activity::factory()->create()->id,
            'user_id' => User::anggota()->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'anggota'])->id,
            'status' => $status,
            'check_in_time' => $checkInTime,
            'notes' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the attendance is present.
     */
    public function present(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'present',
            'check_in_time' => fake()->dateTimeBetween('-30 days', 'now'),
        ]);
    }

    /**
     * Indicate that the attendance is late.
     */
    public function late(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'late',
            'check_in_time' => fake()->dateTimeBetween('-30 days', 'now'),
            'notes' => 'Arrived late due to ' . fake()->sentence(4),
        ]);
    }
}