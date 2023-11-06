<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use App\Notifications\NewCompanyNotification;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::orderBY('id','desc')->paginate(10); // Paginate with 10 companies per page

        return response()->json($companies, 200);
    }

    /**
     * Get a listing of the resource.
     */
    public function getCompanies()
    {
        $companies = Company::select('id','name')->get();

        return response()->json($companies, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        try {
            $data = $request->validated(); // Get validated data
            if ($request->hasFile('logo')) {
                $logoPath = $request->file('logo')->store('public/company-logos');
                $data['logo'] = str_replace('public/', 'storage/', $logoPath);
            }
            $company = Company::create([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'logo' => $data['logo'] ?? null,
                'website' => $data['website'] ?? null,
            ]);
            // Send the notification
            $company->notify(new NewCompanyNotification($company));

            return response()->json($company, 201); // Return the created company with a status code of 201
        } catch (\Exception $exception){
            return response()->json($exception->getMessage(), $exception->getCode());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        // You can use the CompanyResource to shape the response
        return new CompanyResource($company);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        try {
            $data = $request->validated(); // Get validated data
            if ($request->hasFile('logo')) {
                $logoPath = $request->file('logo')->store('public/company-logos');
                $data['logo'] = str_replace('public/', 'storage/', $logoPath);
            }

            $company->update([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'logo' => $data['logo'] ?? null,
                'website' => $data['website'] ?? null,
            ]);
            return new CompanyResource($company);
        } catch (\Exception $exception) {
            return response()->json($exception->getMessage(), $exception->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        // Remove the company's logo from storage (public directory)
        if ($company->logo) {
            // Assuming the logo field stores the path to the logo in the storage directory.
            $logoPath = $company->logo;
            if (Storage::disk('public')->exists($logoPath)) {
                Storage::disk('public')->delete($logoPath);
            }
        }
        $company->delete();
        return response()->json(['message' => 'Company deleted successfully']);
    }
}
