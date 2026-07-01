<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFragranceCategoryRequest;
use App\Http\Requests\UpdateFragranceCategoryRequest;
use App\Models\FragranceCategory;
use App\Services\FragranceCategoryService;
use Inertia\Inertia;

class FragranceCategoryController extends Controller
{
    public function __construct(private FragranceCategoryService $fragranceCategoryService) {}

    public function index()
    {
        $categories = $this->fragranceCategoryService->getAll();

        return Inertia::render('fragrance-categories/manage', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreFragranceCategoryRequest $request)
    {
        $this->fragranceCategoryService->create($request->validated());

        return redirect()->route('fragrance-categories.index')->with('success', __('Category created successfully.'));
    }

    public function update(UpdateFragranceCategoryRequest $request, FragranceCategory $fragranceCategory)
    {
        $this->fragranceCategoryService->update($fragranceCategory, $request->validated());

        return redirect()->route('fragrance-categories.index')->with('success', __('Category updated successfully.'));
    }

    public function destroy(FragranceCategory $fragranceCategory)
    {
        $this->fragranceCategoryService->delete($fragranceCategory);

        return redirect()->route('fragrance-categories.index')->with('success', __('Category deleted successfully.'));
    }
}
