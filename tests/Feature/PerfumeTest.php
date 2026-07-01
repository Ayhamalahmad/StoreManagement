<?php

use App\Models\FragranceCategory;
use App\Models\Perfume;
use App\Models\Season;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->seed([SeasonSeeder::class, FragranceCategorySeeder::class]);
});

test('guests cannot view perfumes manage page', function () {
    $this->get(route('perfumes.manage'))->assertRedirect(route('login'));
});

test('guests cannot view perfumes browse page', function () {
    $this->get(route('perfumes.index'))->assertRedirect(route('login'));
});

test('authenticated users can view perfumes manage page', function () {
    Perfume::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get(route('perfumes.manage'))
        ->assertInertia(fn ($page) => $page
            ->component('perfumes/manage')
            ->has('perfumes', 3)
        );
});

test('authenticated users can view perfumes browse page', function () {
    Perfume::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get(route('perfumes.index'))
        ->assertInertia(fn ($page) => $page
            ->component('perfumes/index')
            ->has('perfumes', 3)
        );
});

test('authenticated users can view a single perfume', function () {
    $perfume = Perfume::factory()->create();

    $this->actingAs($this->user)
        ->get(route('perfumes.show', $perfume))
        ->assertInertia(fn ($page) => $page
            ->component('perfumes/show')
            ->has('perfume')
        );
});

test('user can create a perfume', function () {
    $this->actingAs($this->user);

    $category = FragranceCategory::where('slug', 'unisex')->first();

    $data = [
        'name' => ['en' => 'Test Perfume', 'tr' => 'Test Parfüm', 'ar' => 'عطر تجريبي'],
        'code' => 'TEST-001',
        'fragrance_category_ids' => $category ? [$category->id] : [],
    ];

    $this->post(route('perfumes.store'), $data)
        ->assertRedirect(route('perfumes.manage'));

    $this->assertDatabaseHas('perfumes', ['code' => 'TEST-001']);
});

test('user can update a perfume', function () {
    $perfume = Perfume::factory()->create();

    $this->actingAs($this->user);

    $this->put(route('perfumes.update', $perfume), [
        'name' => ['en' => 'Updated', 'tr' => 'Güncellendi', 'ar' => 'محدث'],
        'code' => $perfume->code,
    ])->assertRedirect(route('perfumes.manage'));

    expect($perfume->fresh()->name['en'])->toBe('Updated');
});

test('user can delete a perfume', function () {
    $perfume = Perfume::factory()->create();

    $this->actingAs($this->user);

    $this->delete(route('perfumes.destroy', $perfume))
        ->assertRedirect(route('perfumes.manage'));

    expect(Perfume::find($perfume->id))->toBeNull();
});

test('perfume code must be unique', function () {
    Perfume::factory()->create(['code' => 'DUP-001']);

    $this->actingAs($this->user)
        ->post(route('perfumes.store'), [
            'name' => ['en' => 'Test', 'tr' => 'Test', 'ar' => 'اختبار'],
            'code' => 'DUP-001',
        ])
        ->assertSessionHasErrors('code');
});

test('perfume requires name', function () {
    $this->actingAs($this->user)
        ->post(route('perfumes.store'), [
            'code' => 'TEST-002',
        ])
        ->assertSessionHasErrors(['name', 'name.en', 'name.tr', 'name.ar']);
});
