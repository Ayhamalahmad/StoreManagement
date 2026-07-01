<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSillageLevelRequest;
use App\Http\Requests\UpdateSillageLevelRequest;
use App\Models\SillageLevel;
use App\Services\SillageLevelService;
use Inertia\Inertia;

class SillageLevelController extends Controller
{
    public function __construct(private SillageLevelService $sillageLevelService) {}

    public function index()
    {
        $sillageLevels = $this->sillageLevelService->getAll();

        return Inertia::render('sillage-levels/manage', [
            'sillageLevels' => $sillageLevels,
        ]);
    }

    public function store(StoreSillageLevelRequest $request)
    {
        $this->sillageLevelService->create($request->validated());

        return redirect()->route('sillage-levels.index')->with('success', __('Sillage level created successfully.'));
    }

    public function update(UpdateSillageLevelRequest $request, SillageLevel $sillageLevel)
    {
        $this->sillageLevelService->update($sillageLevel, $request->validated());

        return redirect()->route('sillage-levels.index')->with('success', __('Sillage level updated successfully.'));
    }

    public function destroy(SillageLevel $sillageLevel)
    {
        $this->sillageLevelService->delete($sillageLevel);

        return redirect()->route('sillage-levels.index')->with('success', __('Sillage level deleted successfully.'));
    }
}
