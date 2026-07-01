<?php

namespace Database\Factories;

use App\Models\Oil;
use Illuminate\Database\Eloquent\Factories\Factory;

class OilFactory extends Factory
{
    protected $model = Oil::class;

    public function definition(): array
    {
        $categories = ['Essential Oil', 'Fragrance Oil', 'Carrier Oil', 'Blend'];
        $category = $this->faker->randomElement($categories);

        return [
            'name' => [
                'en' => $this->faker->unique()->words(3, true) . ' Oil',
                'tr' => $this->faker->unique()->words(3, true) . ' Yağ',
                'ar' => $this->faker->unique()->words(3, true) . ' زيت',
            ],
            'code' => strtoupper($this->faker->unique()->bothify('OIL-###')),
            'image' => null,
            'category' => [
                'en' => $category,
                'tr' => $category === 'Essential Oil' ? 'Esansiyel Yağ' : ($category === 'Fragrance Oil' ? 'Koku Yağı' : ($category === 'Carrier Oil' ? 'Taşıyıcı Yağ' : 'Karışım')),
                'ar' => $category === 'Essential Oil' ? 'زيت عطري' : ($category === 'Fragrance Oil' ? 'زيت عطر' : ($category === 'Carrier Oil' ? 'زيت ناقل' : 'مزيج')),
            ],
            'brand' => $this->faker->company(),
            'volume' => $this->faker->randomFloat(2, 5, 1000),
            'price' => $this->faker->randomFloat(2, 5, 200),
            'shelf' => $this->faker->randomElement(['Shelf 01', 'Shelf 02', 'Shelf 03', 'Shelf 04', 'Shelf 05']),
            'section' => $this->faker->randomElement(['Section A', 'Section B', 'Section C', 'Section D']),
            'warehouse' => $this->faker->randomElement(['Warehouse 1', 'Warehouse 2', 'Warehouse 3']),
            'notes' => [
                'en' => $this->faker->sentence(5),
                'tr' => $this->faker->sentence(5),
                'ar' => $this->faker->sentence(5),
            ],
            'supplier' => $this->faker->company(),
        ];
    }
}
