<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePerfumeRequest;
use App\Http\Requests\UpdatePerfumeRequest;
use App\Models\Perfume;
use App\Services\PerfumeService;
use Inertia\Inertia;

class PerfumeController extends Controller
{
    public function __construct(private PerfumeService $perfumeService) {}

    public function index()
    {
        $perfumes = $this->perfumeService->getAll();

        return Inertia::render('perfumes/manage', [
            'perfumes' => $perfumes,
        ]);
    }

    public function browse()
    {
        $perfumes = $this->perfumeService->getBrowseData();

        return Inertia::render('perfumes/index', [
            'perfumes' => $perfumes,
        ]);
    }

    public function show(Perfume $perfume)
    {
        return Inertia::render('perfumes/show', [
            'perfume' => $perfume,
        ]);
    }

    public function store(StorePerfumeRequest $request)
    {
        $this->perfumeService->create($request->validated(), $request->file('image'));

        return redirect()->route('perfumes.manage')->with('success', __('Perfume created successfully.'));
    }

    public function update(UpdatePerfumeRequest $request, Perfume $perfume)
    {
        $this->perfumeService->update($perfume, $request->validated(), $request->file('image'));

        return redirect()->route('perfumes.manage')->with('success', __('Perfume updated successfully.'));
    }

    public function destroy(Perfume $perfume)
    {
        $this->perfumeService->delete($perfume);

        return redirect()->route('perfumes.manage')->with('success', __('Perfume deleted successfully.'));
    }
}
