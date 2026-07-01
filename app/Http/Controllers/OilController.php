<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOilRequest;
use App\Http\Requests\UpdateOilRequest;
use App\Models\Oil;
use App\Services\OilService;
use Inertia\Inertia;

class OilController extends Controller
{
    public function __construct(private OilService $oilService) {}

    public function index()
    {
        $oils = $this->oilService->getAll();

        return Inertia::render('oils/manage', [
            'oils' => $oils,
        ]);
    }

    public function browse()
    {
        $oils = $this->oilService->getBrowseData();

        return Inertia::render('oils/index', [
            'oils' => $oils,
        ]);
    }

    public function show(Oil $oil)
    {
        return Inertia::render('oils/show', [
            'oil' => $oil,
        ]);
    }

    public function store(StoreOilRequest $request)
    {
        $this->oilService->create($request->validated(), $request->file('image'));

        return redirect()->route('oils.manage')->with('success', __('Oil created successfully.'));
    }

    public function update(UpdateOilRequest $request, Oil $oil)
    {
        $this->oilService->update($oil, $request->validated(), $request->file('image'));

        return redirect()->route('oils.manage')->with('success', __('Oil updated successfully.'));
    }

    public function destroy(Oil $oil)
    {
        $this->oilService->delete($oil);

        return redirect()->route('oils.manage')->with('success', __('Oil deleted successfully.'));
    }
}
