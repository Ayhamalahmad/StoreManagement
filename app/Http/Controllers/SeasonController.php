<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSeasonRequest;
use App\Http\Requests\UpdateSeasonRequest;
use App\Models\Season;
use App\Services\SeasonService;
use Inertia\Inertia;

class SeasonController extends Controller
{
    public function __construct(private SeasonService $seasonService) {}

    public function index()
    {
        $seasons = $this->seasonService->getAll();

        return Inertia::render('seasons/manage', [
            'seasons' => $seasons,
        ]);
    }

    public function store(StoreSeasonRequest $request)
    {
        $this->seasonService->create($request->validated());

        return redirect()->route('seasons.index')->with('success', __('Season created successfully.'));
    }

    public function update(UpdateSeasonRequest $request, Season $season)
    {
        $this->seasonService->update($season, $request->validated());

        return redirect()->route('seasons.index')->with('success', __('Season updated successfully.'));
    }

    public function destroy(Season $season)
    {
        $this->seasonService->delete($season);

        return redirect()->route('seasons.index')->with('success', __('Season deleted successfully.'));
    }
}
