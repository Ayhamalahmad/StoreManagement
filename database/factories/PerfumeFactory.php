<?php

namespace Database\Factories;

use App\Models\Perfume;
use Illuminate\Database\Eloquent\Factories\Factory;

class PerfumeFactory extends Factory
{
    protected $model = Perfume::class;

    public function definition(): array
    {
        $genders = ['Erkek', 'Kadın', 'Unisex'];
        $gender = $this->faker->randomElement($genders);

        return [
            'name' => [
                'en' => $this->faker->unique()->words(3, true) . ' Perfume',
                'tr' => $this->faker->unique()->words(3, true) . ' Parfüm',
                'ar' => $this->faker->unique()->words(3, true) . ' عطر',
            ],
            'code' => strtoupper($this->faker->unique()->bothify('??-###')),
            'original_perfume' => [
                'en' => $this->faker->company() . ' ' . $this->faker->word(),
                'tr' => $this->faker->company() . ' ' . $this->faker->word(),
                'ar' => $this->faker->company() . ' ' . $this->faker->word(),
            ],
            'image' => null,
            'gender' => [
                'en' => $gender,
                'tr' => $gender,
                'ar' => $gender === 'Erkek' ? 'ذكر' : ($gender === 'Kadın' ? 'أنثى' : 'للجنسين'),
            ],
            'family' => [
                'en' => $this->faker->randomElement(['Fresh', 'Oriental', 'Woody', 'Floral', 'Citrus', 'Green', 'Leather']),
                'tr' => $this->faker->randomElement(['Taze', 'Oryantal', 'Odunsu', 'Çiçeksi', 'Narenciye', 'Yeşil', 'Deri']),
                'ar' => $this->faker->randomElement(['منعش', 'شرقي', 'خشبي', 'زهري', 'حمضيات', 'أخضر', 'جلدي']),
            ],
            'shelf' => $this->faker->randomElement(['Shelf 01', 'Shelf 02', 'Shelf 03', 'Shelf 04', 'Shelf 05']),
            'section' => $this->faker->randomElement(['Section A', 'Section B', 'Section C', 'Section D']),
            'season' => [
                'en' => $this->faker->randomElement(['Summer', 'Autumn', 'Spring', 'Winter']),
                'tr' => $this->faker->randomElement(['Yaz', 'Sonbahar', 'İlkbahar', 'Kış']),
                'ar' => $this->faker->randomElement(['الصيف', 'الخريف', 'الربيع', 'الشتاء']),
            ],
            'notes' => [
                'en' => $this->faker->sentence(5),
                'tr' => $this->faker->sentence(5),
                'ar' => $this->faker->sentence(5),
            ],
            'top_notes' => [
                'en' => $this->faker->randomElement(['Bergamot, Lemon, Mint', 'Pineapple, Apple, Bergamot', 'Citrus, Lavender, Mint']),
                'tr' => $this->faker->randomElement(['Bergamot, Limon, Nane', 'Ananas, Elma, Bergamot', 'Narenciye, Lavanta, Nane']),
                'ar' => $this->faker->randomElement(['برغموت، ليمون، نعناع', 'أناناس، تفاح، برغموت', 'حمضيات، خزامى، نعناع']),
            ],
            'middle_notes' => [
                'en' => $this->faker->randomElement(['Jasmine, Rose, Cedar', 'Lavender, Sage, Geranium', 'Iris, Violet, Sandalwood']),
                'tr' => $this->faker->randomElement(['Yasemin, Gül, Sedir', 'Lavanta, Adaçayı, Sardunya', 'İris, Menekşe, Sandal Ağacı']),
                'ar' => $this->faker->randomElement(['ياسمين، ورد، أرز', 'خزامى، مريمية، إبرة الراعي', 'سوسن، بنفسج، صندل']),
            ],
            'base_notes' => [
                'en' => $this->faker->randomElement(['Musk, Vanilla, Cedar', 'Amber, Patchouli, Musk', 'Leather, Tobacco, Vetiver']),
                'tr' => $this->faker->randomElement(['Misk, Vanilya, Sedir', 'Amber, Paçuli, Misk', 'Deri, Tütün, Vetiver']),
                'ar' => $this->faker->randomElement(['مسك، فانيليا، أرز', 'عنبر، باتشولي، مسك', 'جلد، تبغ، فيتيفر']),
            ],
            'warehouse' => $this->faker->randomElement(['Warehouse 1', 'Warehouse 2', 'Warehouse 3']),
            'concentration' => [
                'en' => $this->faker->randomElement(['Eau de Parfum', 'Eau de Toilette', 'Cologne']),
                'tr' => $this->faker->randomElement(['Eau de Parfum', 'Eau de Toilette', 'Kolonya']),
                'ar' => $this->faker->randomElement(['ماء عطر', 'ماء تواليت', 'كولونيا']),
            ],
            'sillage' => [
                'en' => $this->faker->randomElement(['Soft', 'Moderate', 'Heavy']),
                'tr' => $this->faker->randomElement(['Hafif', 'Orta', 'Ağır']),
                'ar' => $this->faker->randomElement(['خفيف', 'متوسط', 'ثقيل']),
            ],
            'price' => $this->faker->randomFloat(2, 30, 500),
        ];
    }
}
