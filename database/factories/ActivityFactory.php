<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startTime = fake()->dateTimeBetween('now', '+2 months');
        $endTime = clone $startTime;
        $endTime->modify('+' . fake()->numberBetween(1, 4) . ' hours');

        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(3),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'location' => fake()->address(),
            'status' => fake()->randomElement(['draft', 'published', 'cancelled']),
            'created_by' => User::pembina()->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'pembina'])->id,
        ];
    }

    /**
     * Indicate that the activity is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
        ]);
    }

    /**
     * Indicate that the activity is upcoming.
     */
    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_time' => fake()->dateTimeBetween('+1 day', '+2 months'),
            'status' => 'published',
        ]);
    }
}