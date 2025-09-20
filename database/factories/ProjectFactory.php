<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['pending', 'in_progress', 'completed', 'cancelled']);
        $progress = match($status) {
            'pending' => 0,
            'in_progress' => fake()->numberBetween(10, 90),
            'completed' => 100,
            'cancelled' => fake()->numberBetween(0, 50),
            default => 0,
        };

        return [
            'title' => fake()->sentence(6),
            'description' => fake()->paragraph(4),
            'assigned_to' => User::anggota()->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'anggota'])->id,
            'status' => $status,
            'progress_percentage' => $progress,
            'due_date' => fake()->dateTimeBetween('now', '+6 months'),
            'created_by' => User::pembina()->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'pembina'])->id,
        ];
    }

    /**
     * Indicate that the project is in progress.
     */
    public function inProgress(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in_progress',
            'progress_percentage' => fake()->numberBetween(10, 90),
        ]);
    }

    /**
     * Indicate that the project is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'progress_percentage' => 100,
        ]);
    }
}